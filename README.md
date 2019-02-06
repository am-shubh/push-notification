for ios devices, while building in Xcode change the settings. Follow the steps below:

1. open your project in Xcode
2. Click on File and then Click on Workspace settings
3. click on Build System under "Per-User Workspace Settings" and choose "Legacy Build System" from Dropdown.
4. Click on Done and then you can build.

for android devices, follow usual command: "ionic cordova build android"

Server side api for sending push notification:

I have used firebase firestore as backend to store device tokens and Admin FCM API for sending notifications.

Here is the function:

exports.notifyUsers = functions.https.onRequest((req, res) => {
    <!-- Title of the notification -->
    var title = req.body.title;
    <!-- Notification Body -->
    var msg = req.body.message;

    var devicesRef = db.collection('devices');
    var alldevices = devicesRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {

                let token = doc.id;

                let message = {
                    notification: {
                        title: title,
                        body: msg
                    },
                    token: token
                };

                admin.messaging().send(message);

            });
            return res.status(200).json({
                "success": true, "message": "Push Notification Sent Successfully"
            });
        })
        .catch(err => {
            return res.status(500).json({
                "success": false, "message": err
            });
        });


});