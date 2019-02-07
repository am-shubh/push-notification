for ios devices, while building in Xcode change the settings. Follow the steps below:

1. open your project in Xcode
2. Click on File and then Click on Workspace settings
3. click on Build System under "Per-User Workspace Settings" and choose "Legacy Build System" from Dropdown.
4. Click on Done and then you can build.

for android devices, follow usual command: "ionic cordova build android"

Server side api for sending push notification:

I have used firebase firestore as backend to store device tokens and Admin FCM API for sending notifications.

Here is the function for sending to each registered device individually:

    exports.notifyUsers = functions.https.onRequest((req, res) => {
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



Here is the function for sending notification for subscribed topic:

    exports.notifyUsers = functions.https.onRequest((req, res) => {
        var title = req.body.title;
        var msg = req.body.message;
        
        var topic = "new_blog";

        var message = {
            apns: {
                headers: {
                'apns-priority': '10'
                },
                payload: {
                aps: {
                    alert: {
                    title: title,
                    body: msg,
                    },
                    badge: 42,
                }
                }
            },
            android: {
            ttl: 3600 * 1000, // 1 hour in milliseconds
            priority: 'normal',
            notification: {
                    title: title,
                    body: msg
                }
            },
            topic: topic
        };

        admin.messaging().send(message)
        .then((response) => {
            return res.status(200).json({
                "success": true, "message": "Push Notification Sent Successfully"
            });
        })
        .catch((err) => {
            return res.status(500).json({
                "success": false, "message": err
            });
        });

    });