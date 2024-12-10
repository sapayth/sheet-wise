export default function HowTo() {
    /*body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 20px;
        background-color: #f9f9f9;
        color: #333;
    }
    h1, h2 {
        color: #0056b3;
    }
.step {
        margin: 20px 0;
        padding: 15px;
        border-left: 5px solid #0056b3;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
.step img {
        max-width: 100%;
        height: auto;
        margin: 10px 0;
    }
.note {
        font-size: 0.9em;
        color: #888;
    }
    button {
        background-color: #0056b3;
        color: #fff;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        border-radius: 5px;
    }
    button:hover {
        background-color: #003d82;
    }*/
    return (
        <>
            <h1>How to Create a Google Service Account</h1>
            <p>Follow this step-by-step guide to create a Google Service Account for integrating Sheet Wise with Google Sheets.</p>
            <div className="swise-my-5 swise-p-4 swise-border-slate-700 swise-border-l-4 swise-shadow-sm">
                <h2>Step 1: Open Spreadsheet Integration Settings</h2>
                <ol>
                    <li>Go to the <a href="https://cloud.google.com/" target="_blank">Google Cloud</a>.</li>
                    <li>Sign in or register.</li>
                    <li>Click the <a href="https://console.cloud.google.com/apis/dashboard" target="_blank">Enable API & Create a Service Account</a> link. This will open the Google API Console in a new browser tab.</li>
                </ol>
                <img
                    className="swise-inline-block swise-size-14 swise-rounded-md swise-w-1/2"
                    src={swiseSettings.assetURL + '/img/enable-api.png'}
                    alt="Enable API"/>
            </div>

            <div className="swise-my-5 swise-p-4 swise-border-slate-700 swise-border-l-4 swise-shadow-sm">
                <h2>Step 2: Open the API Project Selector</h2>
                <ol>
                    <li>In the Google API Console, click the dropdown arrow at the top to open the project selector.
                    </li>
                </ol>
                <img
                    className="swise-inline-block swise-size-14 swise-rounded-md swise-w-1/2"
                    src={swiseSettings.assetURL + '/img/select-project.png'}
                    alt="API Project Selector"/>
            </div>

            <div className="swise-my-5 swise-p-4 swise-border-slate-700 swise-border-l-4 swise-shadow-sm">
                <h2>Step 3: Create a New API Project</h2>
                <ol>
                    <li>Click <b>New Project</b> to create a new API project.</li>
                    <li>Name your project and click <b>Create</b>.</li>
                </ol>
                <img
                    className="swise-inline-block swise-size-14 swise-rounded-md swise-w-1/2"
                    src={swiseSettings.assetURL + '/img/select-project.png'}
                    alt="Create New Project"/>
            </div>

            <div className="swise-my-5 swise-p-4 swise-border-slate-700 swise-border-l-4 swise-shadow-sm">
                <h2>Step 4: Enable Required APIs</h2>
                <ol>
                    <li>Select your newly created project from the dropdown menu.</li>
                    <li>Go to the <b>Library</b> and search for <b>Google Drive API</b>. Enable it.</li>
                    <li>Repeat the process to enable the <b>Google Sheets API</b>.</li>
                </ol>
                <img
                    className="swise-inline-block swise-size-14 swise-rounded-md swise-w-1/2"
                    src={swiseSettings.assetURL + '/img/enable-apis.png'}
                    alt="Enable APIs"/>
                <div className="note">Ensure both APIs are enabled before proceeding.</div>
            </div>

            <div className="swise-my-5 swise-p-4 swise-border-slate-700 swise-border-l-4 swise-shadow-sm">
                <h2>Step 5: Create Credentials</h2>
                <ol>
                    <li>Go to the <b>Credentials</b> section in the API Console.</li>
                    <li>Click <b>+ Create Credentials</b> and select <b>Service Account</b>.</li>
                    <li>Name the service account (e.g., Spreadsheet Integration Service Account).</li>
                    <li>Click <b>Done</b> to create the account.</li>
                </ol>
                <img
                    className="swise-inline-block swise-size-14 swise-rounded-md swise-w-1/2"
                    src={swiseSettings.assetURL + '/img/create-credential-1.png'}
                    alt="Create Credentials"/>
                <img
                    className="swise-inline-block swise-size-14 swise-rounded-md swise-w-1/2"
                    src={swiseSettings.assetURL + '/img/create-credential-2.png'}
                    alt="Create Credentials"/>
            </div>

            <div className="swise-my-5 swise-p-4 swise-border-slate-700 swise-border-l-4 swise-shadow-sm">
                <h2>Step 6: Generate a Service Account Key</h2>
                <ol>
                <li>Click on the created service account email address.</li>
                    <li>Go to the <b>Keys</b> tab and select <b>Add Key > Create New Key</b>.</li>
                    <li>Choose <b>JSON</b> as the key type and click <b>Create</b>.</li>
                    <li>Download the JSON file to your computer.</li>
                </ol>
                <div className="note">Keep this file safe as it contains sensitive information.</div>
            </div>

            <div className="swise-my-5 swise-p-4 swise-border-slate-700 swise-border-l-4 swise-shadow-sm">
                <h2>Step 7: Configure in WordPress</h2>
                <ol>
                    <li>Go back to the <b>Sheet Wise > Settings</b> from WP Dashboard.</li>
                    <li>Paste the contents of the downloaded JSON file in the key field.</li>
                    <li>Click <b>Save</b>.</li>
                </ol>
            </div>

            <div className="swise-my-5 swise-p-4 swise-border-slate-700 swise-border-l-4 swise-shadow-sm">
                <h2>Step 8: Share Google Sheets with Service Account</h2>
                <ol>
                    <li>Go to your Google Sheet and click the <b>Share</b> button.</li>
                    <li>Enter the service account email address and click <b>Done</b>.</li>
                </ol>
            </div>
        </>
    )
}