# -*- coding: utf-8 -*-
# Part of Xao Xao Digital CO.,LTD. See LICENSE file for full copyright and licensing details.
{
    'name': "Button Collapse Left Panel - Xao Xao Digital",
    'version': '11.0.1.0',
    'summary': 'Xao Xao Backend Theme Button Collapse Left Panel',
    'description': """
The module which add new special button to collapse left sidebar
    """,
    'author': "Xao Xao Digital CO.,LTD",
    'website': "https://www.xaoxao.vn",
    "category": "Theme/Backend",
    'depends': [
        'web',
        'backend_theme_v11'
    ],
    'data': [
        # Security
        # Data
        # Views
        # Views Template
        'views/assets.xml',
        'views/templates.xml',
        # Menu
    ],
    'images': ['static/description/banner.png'],
    'license': 'LGPL-3',
    'application': True,
    'installable': True,
}
