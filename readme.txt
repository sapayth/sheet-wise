=== Sheet Wise ===
Contributors: sapayth
Tags: Google Sheets, Data sync, Google API, Automation, Hooks
Requires at least: 5.0
Tested up to: 6.7
Stable tag: 1.1.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Sync WordPress data to Google Sheets seamlessly with Sheet Wise. Automate forms, posts, & more using powerful hooks. Perfect for effortless workflows!

== Description ==
**Sheet Wise** is a powerful WordPress plugin that enables seamless data synchronization between WordPress and Google Sheets. By using various hooks, it allows users to automatically send data from WordPress forms, custom posts, and other data sources directly to Google Sheets.

**Supported Hooks:**
Sheet Wise supports the following WordPress hooks for data synchronization:
- **user_register**: Syncs data when a new user registers.
- **wp_update_user**: Syncs data when a user profile is updated.
- **delete_user**: Syncs data when a user is deleted.
- **wp_login**: Syncs data when a user logs in.
- **wp_logout**: Syncs data when a user logs out.
- **save_post**: Syncs data when a new post is created.
- **edit_post**: Syncs data when a post is edited.
- **wp_trash_post**: Syncs data when a post is deleted (trashed).
- **wp_insert_comment**: Syncs data when a new comment is added.
- **edit_comment**: Syncs data when a comment edited.
Woocommerce Integration:
- **woocommerce_new_product**: Syncs data when a new product is created.
- **woocommerce_update_product**: Syncs data when a product is updated.
- **woocommerce_delete_product**: Syncs data when a product is deleted.
- **woocommerce_update_order**: Syncs data when an order data is changed.

**Key Features:**
- Sync WordPress data with Google Sheets.
- Support for different WordPress and WooCommerce hooks for customizable data transfer.
- Easy integration with Google API.
- Automate data flow and management.
- User-friendly interface for managing sync settings.

== Step-by-Step Guide to Setting Up Sheet Wise ==
**Step 1: Configure Google Service Account Credentials**
1. Navigate to the WordPress Dashboard > Sheet Wise > Settings.
2. Paste the Service Account Credential JSON into the text box provided.
3. Click the Save button to store the credentials.
4. If you're unsure how to obtain the JSON credentials, click the `How to?` link for detailed instructions.

**Step 2: Add a New Integration**
1. Go to the WordPress Dashboard > Sheet Wise and click Add New Integration.
2. Fill out the following fields:
    - Integration Title: Enter a title for the integration (e.g., "New User").
    - Data Source: Select when the data should sync to your Google Sheet. Available options include triggers like:
        Create, Update, Delete user, Login, Logout, Create, Edit, Trash post, Add, Edit comment.
3. Spreadsheet & Worksheet: Choose the target Google Spreadsheet and Worksheet where the data should be saved.

**Step 3: Map Data Fields to Google Sheet Columns**
In the Spreadsheet Column Title section, the column names will be automatically retrieved from the spreadsheet you selected.
For each column:
1. Event Code: Use pre-defined placeholders (e.g., [[first_name]], [[user_login]]) to represent WordPress data fields. These placeholders will be automatically populated based on the Data Source Event Name dropdown.
2. Repeat this mapping process for all required fields to ensure the data syncs accurately.

**Step 4: Save the Integration**
Once all fields are mapped and configured, click the Save button at the bottom of the page.
The integration is now active, and data will sync automatically based on the selected triggers.

== Installation ==
1. Upload the `sheet-wise` folder to the `/wp-content/plugins/` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Go to the `Sheet Wise` settings page to configure your Google API and select the hooks for syncing data.

== Frequently Asked Questions ==

= What is the minimum PHP version required for Sheet Wise? =
Sheet Wise requires PHP 7.4 or higher to function properly.

= How do I set up Google API integration? =
After activating the plugin, navigate to the plugin settings page where you will find instructions to set up and link your Google API for seamless data transfer.

= Can I customize which data is sent to Google Sheets? =
Yes, you can select from various hooks and customize which data to sync according to your needs.

== ==




== Screenshots ==

1. Add new integration
2. Settings for Sheet Wise

== Changelog ==

= v1.1.0 (5 Jan, 2025) =
* Enhance - Added WooCommerce integration

= v1.0.1 (4 Dec, 2024) =
* Enhance - How to page added for Google API setup

= v1.0.0 (30 Nov, 2024) =
* Initial release
* Sync data from WordPress to Google Sheets using various hooks
* User-friendly settings page for API setup and sync management

== Upgrade Notice ==
= 1.0.0 =
Initial release. Please ensure your PHP version is 7.2 or higher for compatibility.

== Support ==
For any support requests, please visit our support page or reach out to us through the WordPress support forums.

== Tags ==
Google Sheets, data sync, WordPress plugin, automation, Google API, data management
