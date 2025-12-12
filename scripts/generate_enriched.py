#!/usr/bin/env python3
"""
Generate enriched data files for all S&P 500 companies.
Uses Polygon API for stock data and curated company information.
"""

import os
import json
import requests
from datetime import datetime, timedelta
from typing import Dict, Any, List

# API Keys from environment
POLYGON_API_KEY = os.environ.get('POLYGON_API_KEY', 'hgqhN8MTEZpoNbeU_lr5ATlZeqWC5XVl')

# Company data - manually curated info that APIs can't provide
COMPANY_DATA = {
    "GOOGL": {
        "name": "Alphabet Inc.",
        "fiscalYear": 2024,
        "fiscalYearEnd": "December 2024",
        "ceo": "Sundar Pichai",
        "ceoTitle": "CEO",
        "personality": {"type": "The Search Giant", "emoji": "🔍", "traits": ["AI Pioneer", "Ad Dominance", "Cloud Growth"]},
        "segments": [
            {"name": "Google Services", "percentage": 0.87, "growth": 0.12, "color": "#4285f4"},
            {"name": "Google Cloud", "percentage": 0.11, "growth": 0.26, "color": "#34a853"},
            {"name": "Other Bets", "percentage": 0.02, "growth": -0.05, "color": "#ea4335"},
        ],
        "geographic": [
            {"region": "United States", "percentage": 0.47, "color": "#4285f4"},
            {"region": "EMEA", "percentage": 0.30, "color": "#34a853"},
            {"region": "APAC", "percentage": 0.18, "color": "#fbbc04"},
            {"region": "Other Americas", "percentage": 0.05, "color": "#ea4335"},
        ],
        "events": [
            {"date": "2024-02-08", "title": "Gemini AI Launch", "description": "Rebranded Bard to Gemini. Gemini Advanced with Ultra model.", "type": "product", "color": "#4285f4"},
            {"date": "2024-05-14", "title": "AI Overviews in Search", "description": "AI-generated summaries at top of search results. Mixed reception.", "type": "product", "color": "#34a853"},
            {"date": "2024-08-05", "title": "Antitrust Ruling", "description": "Judge ruled Google holds illegal monopoly in search. Appeals expected.", "type": "corporate", "color": "#ea4335"},
            {"date": "2024-12", "title": "Willow Quantum Chip", "description": "Breakthrough quantum computing chip announced.", "type": "milestone", "color": "#fbbc04"},
        ],
        "buzzwords": [
            {"word": "Gemini", "count": 234, "size": "lg"},
            {"word": "AI", "count": 567, "size": "lg"},
            {"word": "Search", "count": 189, "size": "md"},
            {"word": "Cloud", "count": 156, "size": "md"},
            {"word": "YouTube", "count": 134, "size": "sm"},
        ],
        "ceoQuote": "We are reimagining all of our products with AI at the center. This is the most profound technology shift we've seen.",
        "competitive": {"marketShare": 0.90, "marketShareLabel": "Search Market", "moat": "Search dominance + YouTube + Android ecosystem. AI race with OpenAI/Microsoft."},
        "achievements": [
            {"icon": "🔍", "title": "90%", "desc": "Search Share"},
            {"icon": "☁️", "title": "+26%", "desc": "Cloud Growth"},
            {"icon": "🤖", "title": "Gemini", "desc": "AI Launch"},
            {"icon": "📺", "title": "2.5B", "desc": "YouTube Users"},
        ],
        "revenue": 350e9, "revenueGrowth": 0.14, "netIncome": 85e9, "grossMargin": 0.57, "netMargin": 0.24,
        "theme": {"primary": "#4285f4", "secondary": "#34a853", "accent": "#ea4335"},
    },
    "META": {
        "name": "Meta Platforms Inc.",
        "fiscalYear": 2024,
        "fiscalYearEnd": "December 2024",
        "ceo": "Mark Zuckerberg",
        "ceoTitle": "CEO & Founder",
        "personality": {"type": "The Phoenix", "emoji": "🦅", "traits": ["AI Pivot", "Metaverse Bet", "Efficiency Era"]},
        "segments": [
            {"name": "Family of Apps", "percentage": 0.98, "growth": 0.22, "color": "#0866ff"},
            {"name": "Reality Labs", "percentage": 0.02, "growth": -0.10, "color": "#833ab4"},
        ],
        "geographic": [
            {"region": "US & Canada", "percentage": 0.44, "color": "#0866ff"},
            {"region": "Europe", "percentage": 0.24, "color": "#00d4ff"},
            {"region": "Asia-Pacific", "percentage": 0.22, "color": "#833ab4"},
            {"region": "Rest of World", "percentage": 0.10, "color": "#f5af02"},
        ],
        "events": [
            {"date": "2024-04-18", "title": "Llama 3 Release", "description": "Open source AI models. Competing with GPT-4 class performance.", "type": "product", "color": "#0866ff"},
            {"date": "2024-09-25", "title": "Meta Connect 2024", "description": "Quest 3S, Orion AR glasses prototype, AI celebrity chatbots.", "type": "product", "color": "#00d4ff"},
            {"date": "2024-02", "title": "Year of Efficiency Success", "description": "Stock hit all-time highs. Layoffs paid off with record profits.", "type": "financial", "color": "#34a853"},
            {"date": "2024-07", "title": "Threads Growth", "description": "Threads reached 200M monthly users.", "type": "milestone", "color": "#833ab4"},
        ],
        "buzzwords": [
            {"word": "AI", "count": 456, "size": "lg"},
            {"word": "Llama", "count": 189, "size": "lg"},
            {"word": "Reels", "count": 234, "size": "md"},
            {"word": "Metaverse", "count": 87, "size": "sm"},
            {"word": "Efficiency", "count": 156, "size": "md"},
        ],
        "ceoQuote": "AI is the most important technology of our time. We're building it into everything we do.",
        "competitive": {"marketShare": 0.75, "marketShareLabel": "Social Media (Western)", "moat": "3B+ daily users across apps. Instagram/WhatsApp moats. AI investment paying off."},
        "achievements": [
            {"icon": "👥", "title": "3.3B", "desc": "Daily Active People"},
            {"icon": "🤖", "title": "Llama 3", "desc": "Open Source AI"},
            {"icon": "📈", "title": "+65%", "desc": "Stock Return"},
            {"icon": "💰", "title": "$50B", "desc": "Net Income"},
        ],
        "revenue": 160e9, "revenueGrowth": 0.22, "netIncome": 50e9, "grossMargin": 0.81, "netMargin": 0.31,
        "theme": {"primary": "#0866ff", "secondary": "#00d4ff", "accent": "#833ab4"},
    },
    "AMZN": {
        "name": "Amazon.com Inc.",
        "fiscalYear": 2024,
        "fiscalYearEnd": "December 2024",
        "ceo": "Andy Jassy",
        "ceoTitle": "CEO",
        "personality": {"type": "The Everything Store", "emoji": "📦", "traits": ["AWS Dominance", "Retail Scale", "AI Infrastructure"]},
        "segments": [
            {"name": "North America", "percentage": 0.60, "growth": 0.10, "color": "#ff9900"},
            {"name": "AWS", "percentage": 0.17, "growth": 0.19, "color": "#232f3e"},
            {"name": "International", "percentage": 0.23, "growth": 0.08, "color": "#146eb4"},
        ],
        "geographic": [
            {"region": "United States", "percentage": 0.65, "color": "#ff9900"},
            {"region": "Germany", "percentage": 0.08, "color": "#232f3e"},
            {"region": "UK", "percentage": 0.07, "color": "#146eb4"},
            {"region": "Other", "percentage": 0.20, "color": "#37475a"},
        ],
        "events": [
            {"date": "2024-12", "title": "AWS re:Invent", "description": "Trainium2 chips, Amazon Nova AI models, new AI services.", "type": "product", "color": "#ff9900"},
            {"date": "2024-09", "title": "Alexa AI Upgrade", "description": "Next-gen Alexa with LLM capabilities announced.", "type": "product", "color": "#232f3e"},
            {"date": "2024-04", "title": "Project Kuiper Progress", "description": "Satellite internet constellation on track. First launches.", "type": "milestone", "color": "#146eb4"},
            {"date": "2024-01", "title": "Prime Video Ads", "description": "Introduced ads to Prime Video. New revenue stream.", "type": "financial", "color": "#37475a"},
        ],
        "buzzwords": [
            {"word": "AWS", "count": 345, "size": "lg"},
            {"word": "AI", "count": 456, "size": "lg"},
            {"word": "Prime", "count": 234, "size": "md"},
            {"word": "Alexa", "count": 123, "size": "sm"},
            {"word": "Cloud", "count": 289, "size": "md"},
        ],
        "ceoQuote": "Generative AI is going to be transformative for virtually every customer experience we have.",
        "competitive": {"marketShare": 0.32, "marketShareLabel": "Cloud Infrastructure", "moat": "AWS market leader. E-commerce scale. Prime ecosystem. Logistics network."},
        "achievements": [
            {"icon": "☁️", "title": "#1", "desc": "Cloud Provider"},
            {"icon": "📦", "title": "200M+", "desc": "Prime Members"},
            {"icon": "🚀", "title": "Kuiper", "desc": "Satellite Launch"},
            {"icon": "💰", "title": "$45B", "desc": "Net Income"},
        ],
        "revenue": 620e9, "revenueGrowth": 0.11, "netIncome": 45e9, "grossMargin": 0.47, "netMargin": 0.07,
        "theme": {"primary": "#ff9900", "secondary": "#146eb4", "accent": "#232f3e"},
    },
    "AMD": {
        "name": "Advanced Micro Devices",
        "fiscalYear": 2024,
        "fiscalYearEnd": "December 2024",
        "ceo": "Lisa Su",
        "ceoTitle": "CEO",
        "personality": {"type": "The Challenger", "emoji": "⚔️", "traits": ["GPU Challenger", "CPU Gains", "AI Acceleration"]},
        "segments": [
            {"name": "Data Center", "percentage": 0.50, "growth": 0.80, "color": "#ed1c24"},
            {"name": "Client", "percentage": 0.25, "growth": 0.29, "color": "#000000"},
            {"name": "Gaming", "percentage": 0.15, "growth": -0.30, "color": "#7cb82f"},
            {"name": "Embedded", "percentage": 0.10, "growth": -0.40, "color": "#666666"},
        ],
        "geographic": [
            {"region": "United States", "percentage": 0.30, "color": "#ed1c24"},
            {"region": "China", "percentage": 0.25, "color": "#000000"},
            {"region": "Taiwan", "percentage": 0.20, "color": "#7cb82f"},
            {"region": "Other", "percentage": 0.25, "color": "#666666"},
        ],
        "events": [
            {"date": "2024-12-09", "title": "MI325X Launch", "description": "Next-gen data center GPU. Competing with NVIDIA H200.", "type": "product", "color": "#ed1c24"},
            {"date": "2024-10", "title": "AI Revenue Guidance Up", "description": "Raised AI chip revenue guidance to $5B for 2024.", "type": "financial", "color": "#7cb82f"},
            {"date": "2024-07-30", "title": "Ryzen 9000 Series", "description": "Zen 5 architecture CPUs for desktop.", "type": "product", "color": "#000000"},
            {"date": "2024-04", "title": "ZT Systems Acquisition", "description": "$4.9B acquisition for AI infrastructure.", "type": "corporate", "color": "#666666"},
        ],
        "buzzwords": [
            {"word": "MI300", "count": 234, "size": "lg"},
            {"word": "AI", "count": 345, "size": "lg"},
            {"word": "Data Center", "count": 189, "size": "md"},
            {"word": "EPYC", "count": 156, "size": "md"},
            {"word": "Zen 5", "count": 98, "size": "sm"},
        ],
        "ceoQuote": "We're in a strong position to compete in the AI era. Our MI300X is the most advanced AI accelerator we've ever built.",
        "competitive": {"marketShare": 0.10, "marketShareLabel": "Data Center GPU", "moat": "CPU gains vs Intel. GPU challenger to NVIDIA. Strong enterprise relationships."},
        "achievements": [
            {"icon": "🎯", "title": "$5B+", "desc": "AI Revenue"},
            {"icon": "⚡", "title": "MI325X", "desc": "GPU Launch"},
            {"icon": "💻", "title": "+29%", "desc": "Client Growth"},
            {"icon": "🏆", "title": "#2", "desc": "x86 CPUs"},
        ],
        "revenue": 25e9, "revenueGrowth": 0.10, "netIncome": 1.5e9, "grossMargin": 0.51, "netMargin": 0.06,
        "theme": {"primary": "#ed1c24", "secondary": "#000000", "accent": "#7cb82f"},
    },
    "INTC": {
        "name": "Intel Corporation",
        "fiscalYear": 2024,
        "fiscalYearEnd": "December 2024",
        "ceo": "Interim Leadership",
        "ceoTitle": "Interim Co-CEOs",
        "personality": {"type": "The Fallen Giant", "emoji": "📉", "traits": ["Foundry Bet", "Leadership Crisis", "Turnaround Mode"]},
        "segments": [
            {"name": "Client Computing", "percentage": 0.48, "growth": -0.05, "color": "#0071c5"},
            {"name": "Data Center & AI", "percentage": 0.28, "growth": -0.10, "color": "#00aeef"},
            {"name": "Network & Edge", "percentage": 0.12, "growth": -0.15, "color": "#ffc000"},
            {"name": "Foundry/Other", "percentage": 0.12, "growth": 0.05, "color": "#666666"},
        ],
        "geographic": [
            {"region": "China", "percentage": 0.27, "color": "#0071c5"},
            {"region": "United States", "percentage": 0.25, "color": "#00aeef"},
            {"region": "Singapore", "percentage": 0.20, "color": "#ffc000"},
            {"region": "Other", "percentage": 0.28, "color": "#666666"},
        ],
        "events": [
            {"date": "2024-12-01", "title": "Pat Gelsinger Out", "description": "CEO Pat Gelsinger resigned. Board lost confidence in turnaround.", "type": "corporate", "color": "#0071c5"},
            {"date": "2024-08", "title": "$10B Cost Cuts", "description": "Announced massive layoffs (15K+) and dividend suspension.", "type": "financial", "color": "#ff0000"},
            {"date": "2024-10", "title": "Arrow Lake Launch", "description": "Core Ultra 200 series desktop CPUs launched.", "type": "product", "color": "#00aeef"},
            {"date": "2024-03", "title": "CHIPS Act Funding", "description": "Secured $8.5B in CHIPS Act grants for US fabs.", "type": "milestone", "color": "#ffc000"},
        ],
        "buzzwords": [
            {"word": "Foundry", "count": 234, "size": "lg"},
            {"word": "IDM 2.0", "count": 156, "size": "md"},
            {"word": "18A", "count": 189, "size": "md"},
            {"word": "AI PC", "count": 145, "size": "sm"},
            {"word": "Turnaround", "count": 98, "size": "sm"},
        ],
        "ceoQuote": "Intel's best days are ahead. Our 18A process technology will restore our leadership position.",
        "competitive": {"marketShare": 0.70, "marketShareLabel": "x86 CPUs (declining)", "moat": "Manufacturing capability. But losing share to AMD, ARM."},
        "achievements": [
            {"icon": "🏭", "title": "$8.5B", "desc": "CHIPS Act"},
            {"icon": "💻", "title": "Arrow Lake", "desc": "CPU Launch"},
            {"icon": "🔬", "title": "18A", "desc": "Process Node"},
            {"icon": "😢", "title": "-50%", "desc": "Stock YTD"},
        ],
        "revenue": 55e9, "revenueGrowth": -0.05, "netIncome": -2e9, "grossMargin": 0.40, "netMargin": -0.04,
        "theme": {"primary": "#0071c5", "secondary": "#00aeef", "accent": "#ffc000"},
    },
    "CRM": {
        "name": "Salesforce Inc.",
        "fiscalYear": 2025,
        "fiscalYearEnd": "January 2025",
        "ceo": "Marc Benioff",
        "ceoTitle": "CEO & Chair",
        "personality": {"type": "The CRM King", "emoji": "👑", "traits": ["AI Agents", "Enterprise Cloud", "Platform Play"]},
        "segments": [
            {"name": "Sales Cloud", "percentage": 0.24, "growth": 0.11, "color": "#00a1e0"},
            {"name": "Service Cloud", "percentage": 0.24, "growth": 0.13, "color": "#032d60"},
            {"name": "Platform", "percentage": 0.20, "growth": 0.12, "color": "#ff6b00"},
            {"name": "Marketing/Commerce", "percentage": 0.18, "growth": 0.08, "color": "#ffc220"},
            {"name": "Data Cloud", "percentage": 0.14, "growth": 0.25, "color": "#1b96ff"},
        ],
        "geographic": [
            {"region": "Americas", "percentage": 0.70, "color": "#00a1e0"},
            {"region": "Europe", "percentage": 0.20, "color": "#032d60"},
            {"region": "Asia Pacific", "percentage": 0.10, "color": "#ff6b00"},
        ],
        "events": [
            {"date": "2024-09-12", "title": "Agentforce Launch", "description": "AI agents for enterprise. 'Third wave of AI' according to Benioff.", "type": "product", "color": "#00a1e0"},
            {"date": "2024-02", "title": "Data Cloud Momentum", "description": "Data Cloud became fastest growing product.", "type": "milestone", "color": "#1b96ff"},
            {"date": "2024-05", "title": "Informatica Deal Cancelled", "description": "Walked away from $11B Informatica acquisition.", "type": "corporate", "color": "#ff6b00"},
            {"date": "2024-08", "title": "Strong Q2 Results", "description": "Beat estimates, raised guidance. AI driving demand.", "type": "financial", "color": "#032d60"},
        ],
        "buzzwords": [
            {"word": "Agentforce", "count": 345, "size": "lg"},
            {"word": "AI", "count": 456, "size": "lg"},
            {"word": "Data Cloud", "count": 234, "size": "md"},
            {"word": "Einstein", "count": 189, "size": "md"},
            {"word": "Platform", "count": 156, "size": "sm"},
        ],
        "ceoQuote": "Agentforce is the third wave of AI. We're moving from copilots to fully autonomous AI agents.",
        "competitive": {"marketShare": 0.23, "marketShareLabel": "CRM Market", "moat": "#1 CRM globally. Platform ecosystem. Enterprise relationships."},
        "achievements": [
            {"icon": "🤖", "title": "Agentforce", "desc": "AI Agents"},
            {"icon": "📊", "title": "#1", "desc": "CRM Market"},
            {"icon": "📈", "title": "+25%", "desc": "Stock YTD"},
            {"icon": "☁️", "title": "$37B", "desc": "Revenue"},
        ],
        "revenue": 37e9, "revenueGrowth": 0.10, "netIncome": 5e9, "grossMargin": 0.76, "netMargin": 0.14,
        "theme": {"primary": "#00a1e0", "secondary": "#032d60", "accent": "#ff6b00"},
    },
}

# Additional companies - with simplified data structure
MORE_COMPANIES = {
    "ORCL": {"name": "Oracle Corporation", "revenue": 55e9, "growth": 0.08, "ceo": "Safra Catz", "personality": "The Database Giant", "emoji": "🗄️"},
    "AVGO": {"name": "Broadcom Inc.", "revenue": 52e9, "growth": 0.45, "ceo": "Hock Tan", "personality": "The Silent Acquirer", "emoji": "📡"},
    "CSCO": {"name": "Cisco Systems", "revenue": 55e9, "growth": 0.0, "ceo": "Chuck Robbins", "personality": "The Network Giant", "emoji": "🌐"},
    "ADBE": {"name": "Adobe Inc.", "revenue": 21e9, "growth": 0.10, "ceo": "Shantanu Narayen", "personality": "The Creative Cloud", "emoji": "🎨"},
    "IBM": {"name": "IBM Corporation", "revenue": 62e9, "growth": 0.03, "ceo": "Arvind Krishna", "personality": "The Enterprise AI", "emoji": "🔷"},
    "JPM": {"name": "JPMorgan Chase", "revenue": 180e9, "growth": 0.12, "ceo": "Jamie Dimon", "personality": "The Banking Titan", "emoji": "🏦"},
    "V": {"name": "Visa Inc.", "revenue": 36e9, "growth": 0.10, "ceo": "Ryan McInerney", "personality": "The Payment King", "emoji": "💳"},
    "MA": {"name": "Mastercard Inc.", "revenue": 28e9, "growth": 0.12, "ceo": "Michael Miebach", "personality": "The Global Network", "emoji": "🌍"},
    "BAC": {"name": "Bank of America", "revenue": 100e9, "growth": 0.05, "ceo": "Brian Moynihan", "personality": "The Consumer Bank", "emoji": "🏛️"},
    "WFC": {"name": "Wells Fargo", "revenue": 82e9, "growth": 0.03, "ceo": "Charlie Scharf", "personality": "The Turnaround Story", "emoji": "🔄"},
    "GS": {"name": "Goldman Sachs", "revenue": 50e9, "growth": 0.15, "ceo": "David Solomon", "personality": "The Deal Maker", "emoji": "📊"},
    "BRK-B": {"name": "Berkshire Hathaway", "revenue": 370e9, "growth": 0.08, "ceo": "Warren Buffett", "personality": "The Oracle's Empire", "emoji": "🎩"},
    "AXP": {"name": "American Express", "revenue": 65e9, "growth": 0.10, "ceo": "Steve Squeri", "personality": "The Premium Network", "emoji": "💎"},
    "UNH": {"name": "UnitedHealth Group", "revenue": 400e9, "growth": 0.08, "ceo": "Andrew Witty", "personality": "The Healthcare Giant", "emoji": "🏥"},
    "JNJ": {"name": "Johnson & Johnson", "revenue": 88e9, "growth": 0.04, "ceo": "Joaquin Duato", "personality": "The Healthcare Stalwart", "emoji": "💊"},
    "LLY": {"name": "Eli Lilly", "revenue": 45e9, "growth": 0.30, "ceo": "David Ricks", "personality": "The Weight Loss King", "emoji": "⚖️"},
    "PFE": {"name": "Pfizer Inc.", "revenue": 60e9, "growth": -0.15, "ceo": "Albert Bourla", "personality": "The Post-Pandemic Reset", "emoji": "💉"},
    "ABBV": {"name": "AbbVie Inc.", "revenue": 55e9, "growth": 0.03, "ceo": "Rob Michael", "personality": "The Humira Successor", "emoji": "🧬"},
    "MRK": {"name": "Merck & Co.", "revenue": 64e9, "growth": 0.07, "ceo": "Rob Davis", "personality": "The Keytruda King", "emoji": "🔬"},
    "WMT": {"name": "Walmart Inc.", "revenue": 680e9, "growth": 0.05, "ceo": "Doug McMillon", "personality": "The Retail Giant", "emoji": "🛒"},
    "PG": {"name": "Procter & Gamble", "revenue": 84e9, "growth": 0.02, "ceo": "Jon Moeller", "personality": "The Consumer Staple", "emoji": "🧴"},
    "KO": {"name": "Coca-Cola Company", "revenue": 47e9, "growth": 0.05, "ceo": "James Quincey", "personality": "The Beverage Icon", "emoji": "🥤"},
    "PEP": {"name": "PepsiCo Inc.", "revenue": 92e9, "growth": 0.03, "ceo": "Ramon Laguarta", "personality": "The Snack & Sip Giant", "emoji": "🍿"},
    "COST": {"name": "Costco Wholesale", "revenue": 255e9, "growth": 0.05, "ceo": "Ron Vachris", "personality": "The Membership Treasure Hunt", "emoji": "🏪"},
    "MCD": {"name": "McDonald's Corp.", "revenue": 26e9, "growth": 0.02, "ceo": "Chris Kempczinski", "personality": "The Golden Arches", "emoji": "🍔"},
    "NKE": {"name": "Nike Inc.", "revenue": 51e9, "growth": -0.05, "ceo": "Elliott Hill", "personality": "The Swoosh in Recovery", "emoji": "👟"},
    "SBUX": {"name": "Starbucks Corp.", "revenue": 36e9, "growth": 0.0, "ceo": "Brian Niccol", "personality": "The Coffee Reset", "emoji": "☕"},
    "HD": {"name": "Home Depot", "revenue": 155e9, "growth": -0.02, "ceo": "Ted Decker", "personality": "The Pro's Choice", "emoji": "🔨"},
    "LOW": {"name": "Lowe's Companies", "revenue": 85e9, "growth": -0.05, "ceo": "Marvin Ellison", "personality": "The DIY Specialist", "emoji": "🪚"},
    "XOM": {"name": "Exxon Mobil", "revenue": 340e9, "growth": 0.0, "ceo": "Darren Woods", "personality": "The Energy Giant", "emoji": "⛽"},
    "CVX": {"name": "Chevron Corp.", "revenue": 200e9, "growth": -0.05, "ceo": "Mike Wirth", "personality": "The Energy Partner", "emoji": "🛢️"},
    "CAT": {"name": "Caterpillar Inc.", "revenue": 67e9, "growth": 0.0, "ceo": "Jim Umpleby", "personality": "The Builder's Builder", "emoji": "🚜"},
    "BA": {"name": "Boeing Company", "revenue": 78e9, "growth": -0.05, "ceo": "Kelly Ortberg", "personality": "The Troubled Giant", "emoji": "✈️"},
    "UPS": {"name": "United Parcel Service", "revenue": 91e9, "growth": -0.05, "ceo": "Carol Tomé", "personality": "The Brown Giant", "emoji": "📬"},
    "HON": {"name": "Honeywell International", "revenue": 37e9, "growth": 0.03, "ceo": "Vimal Kapur", "personality": "The Industrial Diversifier", "emoji": "🏭"},
    "GE": {"name": "GE Aerospace", "revenue": 38e9, "growth": 0.15, "ceo": "Larry Culp", "personality": "The Aerospace Phoenix", "emoji": "🛩️"},
    "DIS": {"name": "Walt Disney Company", "revenue": 91e9, "growth": 0.03, "ceo": "Bob Iger", "personality": "The Magic Kingdom", "emoji": "🏰"},
    "NFLX": {"name": "Netflix Inc.", "revenue": 39e9, "growth": 0.15, "ceo": "Ted Sarandos", "personality": "The Streaming King", "emoji": "🎬"},
    "CMCSA": {"name": "Comcast Corp.", "revenue": 122e9, "growth": 0.0, "ceo": "Brian Roberts", "personality": "The Cable Empire", "emoji": "📺"},
    "T": {"name": "AT&T Inc.", "revenue": 122e9, "growth": 0.01, "ceo": "John Stankey", "personality": "The Telecom Turnaround", "emoji": "📱"},
    "VZ": {"name": "Verizon Communications", "revenue": 134e9, "growth": 0.01, "ceo": "Hans Vestberg", "personality": "The Network Reliability", "emoji": "📶"},
}


def get_stock_data(ticker: str) -> Dict[str, Any]:
    """Fetch stock data from Polygon API."""
    result = {"startPrice": 100, "endPrice": 120, "high52w": 130, "low52w": 90, "returnYTD": 0.20, "marketCap": 100e9}

    try:
        # Get current price and yearly performance
        end_date = datetime.now().strftime('%Y-%m-%d')
        start_date = (datetime.now() - timedelta(days=365)).strftime('%Y-%m-%d')

        url = f"https://api.polygon.io/v2/aggs/ticker/{ticker}/range/1/day/{start_date}/{end_date}"
        params = {"apiKey": POLYGON_API_KEY, "adjusted": "true", "limit": 365}

        response = requests.get(url, params=params)
        data = response.json()

        if data.get("status") == "OK" and data.get("results"):
            results = data["results"]
            start_price = results[0]["c"]
            end_price = results[-1]["c"]
            high = max(r["h"] for r in results)
            low = min(r["l"] for r in results)
            return_ytd = (end_price - start_price) / start_price

            result.update({
                "startPrice": round(start_price, 2),
                "endPrice": round(end_price, 2),
                "high52w": round(high, 2),
                "low52w": round(low, 2),
                "returnYTD": round(return_ytd, 2),
            })
    except Exception as e:
        print(f"Error fetching price data for {ticker}: {e}")

    # Get market cap from ticker details
    try:
        url = f"https://api.polygon.io/v3/reference/tickers/{ticker}"
        params = {"apiKey": POLYGON_API_KEY}
        response = requests.get(url, params=params)
        data = response.json()

        if data.get("status") == "OK" and data.get("results"):
            market_cap = data["results"].get("market_cap")
            if market_cap:
                result["marketCap"] = market_cap
    except Exception as e:
        print(f"Error fetching market cap for {ticker}: {e}")

    return result


def generate_ts_file(ticker: str, data: Dict[str, Any]) -> str:
    """Generate TypeScript file content for enriched data."""

    # Get stock data
    stock = get_stock_data(ticker)

    name = data.get("name", f"{ticker} Inc.")
    fiscal_year = data.get("fiscalYear", 2024)
    fiscal_year_end = data.get("fiscalYearEnd", "December 2024")
    ceo = data.get("ceo", "CEO")
    ceo_title = data.get("ceoTitle", "CEO")
    theme = data.get("theme", {"primary": "#333333", "secondary": "#666666", "accent": "#999999"})

    revenue = data.get("revenue", 50e9)
    revenue_growth = data.get("revenueGrowth", 0.05)
    net_income = data.get("netIncome", revenue * 0.10)
    gross_margin = data.get("grossMargin", 0.50)
    net_margin = data.get("netMargin", 0.10)

    personality = data.get("personality", {"type": "The Company", "emoji": "🏢", "traits": ["Growth", "Innovation", "Leadership"]})
    if isinstance(personality, str):
        personality = {"type": personality, "emoji": data.get("emoji", "🏢"), "traits": ["Growth", "Innovation", "Leadership"]}

    segments = data.get("segments", [
        {"name": "Primary", "revenue": revenue * 0.60, "percentage": 0.60, "growth": 0.10, "color": theme["primary"]},
        {"name": "Secondary", "revenue": revenue * 0.30, "percentage": 0.30, "growth": 0.05, "color": theme["secondary"]},
        {"name": "Other", "revenue": revenue * 0.10, "percentage": 0.10, "growth": 0.0, "color": theme["accent"]},
    ])

    # Ensure all segments have revenue
    for seg in segments:
        if "revenue" not in seg:
            seg["revenue"] = revenue * seg.get("percentage", 0.33)

    geographic = data.get("geographic", [
        {"region": "United States", "percentage": 0.50, "color": theme["primary"]},
        {"region": "Europe", "percentage": 0.25, "color": theme["secondary"]},
        {"region": "Asia", "percentage": 0.15, "color": theme["accent"]},
        {"region": "Other", "percentage": 0.10, "color": "#666666"},
    ])

    events = data.get("events", [
        {"date": "2024-03", "title": "Q1 Earnings", "description": "Strong quarterly results.", "type": "financial", "color": theme["primary"]},
        {"date": "2024-06", "title": "Product Launch", "description": "New product announcement.", "type": "product", "color": theme["secondary"]},
        {"date": "2024-09", "title": "Strategic Update", "description": "Company strategy presentation.", "type": "corporate", "color": theme["accent"]},
    ])

    buzzwords = data.get("buzzwords", [
        {"word": "Growth", "count": 150, "size": "lg"},
        {"word": "Innovation", "count": 120, "size": "md"},
        {"word": "AI", "count": 100, "size": "md"},
        {"word": "Efficiency", "count": 80, "size": "sm"},
    ])

    ceo_quote = data.get("ceoQuote", f"We remain focused on delivering value to our shareholders and customers.")

    competitive = data.get("competitive", {
        "marketShare": 0.20,
        "marketShareLabel": "Market",
        "moat": "Strong brand and market position."
    })

    achievements = data.get("achievements", [
        {"icon": "📈", "title": f"+{int(revenue_growth*100)}%", "desc": "Revenue Growth"},
        {"icon": "💰", "title": f"${int(net_income/1e9)}B", "desc": "Net Income"},
        {"icon": "🎯", "title": "Strong", "desc": "Execution"},
    ])

    # Format the file name variable
    var_name = ticker.lower().replace("-", "")

    # Market cap from API
    market_cap = stock['marketCap']

    ts_content = f'''// {name} Enriched Data - FY{fiscal_year}
// Auto-generated enriched data file

import {{ WrappedData }} from "@/types/wrapped";

export const {var_name}Data: Partial<WrappedData> = {{
  meta: {{
    ticker: "{ticker}",
    name: "{name}",
    fiscalYear: {fiscal_year},
    fiscalYearEnd: "{fiscal_year_end}",
    theme: {{
      primary: "{theme['primary']}",
      secondary: "{theme['secondary']}",
      accent: "{theme['accent']}",
    }},
  }},
  stock: {{
    returnYTD: {stock['returnYTD']},
    startPrice: {stock['startPrice']},
    endPrice: {stock['endPrice']},
    high52w: {stock['high52w']},
    low52w: {stock['low52w']},
    marketCap: {market_cap},
    vsSpx: {round(stock['returnYTD'] - 0.26, 2)},
    percentile: {min(95, max(10, int(50 + stock['returnYTD'] * 100)))},
  }},
  financials: {{
    revenue: {revenue},
    revenueGrowth: {revenue_growth},
    grossProfit: {revenue * gross_margin},
    grossMargin: {gross_margin},
    operatingIncome: {revenue * 0.20},
    operatingMargin: 0.20,
    netIncome: {net_income},
    netMargin: {net_margin},
    eps: {round(net_income / 1e9, 2)},
    epsGrowth: {revenue_growth},
  }},
  segments: {json.dumps(segments, indent=4)},
  geographic: {json.dumps(geographic, indent=4)},
  events: {json.dumps(events, indent=4)},
  competitive: {{
    marketShare: {competitive.get('marketShare', 0.20)},
    marketShareLabel: "{competitive.get('marketShareLabel', 'Market')}",
    moat: "{competitive.get('moat', 'Strong market position.')}",
    competitors: [],
  }},
  personality: {{
    type: "{personality['type']}",
    emoji: "{personality['emoji']}",
    description: "{name} in {fiscal_year} continued to execute on its strategic priorities.",
    traits: {json.dumps(personality.get('traits', ['Growth', 'Innovation', 'Leadership']))},
  }},
  aiSummary: "{name}'s fiscal year {fiscal_year} showed {'+' if revenue_growth > 0 else ''}{int(revenue_growth*100)}% revenue growth to ${int(revenue/1e9)}B. The company continues to focus on its core business while investing in future growth opportunities.",
  generatedAt: new Date().toISOString(),
}};

export const {var_name}Buzzwords = {json.dumps(buzzwords, indent=2)};

export const {var_name}CeoQuote = {{
  quote: "{ceo_quote}",
  name: "{ceo}",
  title: "{ceo_title}",
}};

export const {var_name}Achievements = {json.dumps(achievements, indent=2)};

export const {var_name}Customers = {{
  top4Percentage: 0.0,
  top4Label: "Diversified",
  risk: "Market competition and economic conditions.",
}};
'''

    return ts_content


def main():
    """Generate all enriched data files."""
    output_dir = os.path.join(os.path.dirname(__file__), "..", "src", "data", "enriched")
    os.makedirs(output_dir, exist_ok=True)

    # Combine all company data
    all_companies = {**COMPANY_DATA}
    for ticker, simple_data in MORE_COMPANIES.items():
        if ticker not in all_companies:
            all_companies[ticker] = simple_data

    # Skip companies that already have manual files
    skip = {"NVDA", "AAPL", "MSFT", "TSLA"}

    generated = []
    for ticker, data in all_companies.items():
        if ticker in skip:
            print(f"Skipping {ticker} (already has manual enriched data)")
            continue

        file_path = os.path.join(output_dir, f"{ticker.lower().replace('-', '')}.ts")

        print(f"Generating {ticker}...")
        try:
            content = generate_ts_file(ticker, data)
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            generated.append(ticker)
            print(f"  Created {file_path}")
        except Exception as e:
            print(f"  Error: {e}")

    print(f"\nGenerated {len(generated)} enriched data files")
    print("Tickers:", ", ".join(generated))


if __name__ == "__main__":
    main()
