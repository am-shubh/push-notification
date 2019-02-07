This Project is a simple POC for push notifications in ionic 3.
The blog made by Filip Jerga (https://medium.freecodecamp.org/@filipjerga), helped a lot.
Here is the link, https://medium.freecodecamp.org/how-to-get-push-notifications-working-with-ionic-4-and-firebase-ad87cc92394e

Refer to above blog and the package.json file in this repository for dependencies and plugins with their respective versions, which worked fine for me.

It has functions for both simple message notifications and when user subscribe to particular topic.

For IOS ->

    1. sudo ionic cordova platform add ios
    
        ** If you get Error like "File already exists at destination ...../your_project_directory/platforms/ios/../Resources/GoogleService-Info.plist" then follow these steps:

        a) Remove firebase plugins from Plugins folder, and remove the above file which throws error.
        b) Add the plugin again, run "sudo ionic cordova plugin add cordova-plugin-firebase"

        It should solve the error.
    
    2. sudo ionic cordova build ios

    3. open your project in xcode and follow below steps

    for ios devices, while building in Xcode change the settings. Follow the steps below:

        a) open your project in Xcode
        b) Click on File and then Click on Workspace settings
        c) click on Build System under "Per-User Workspace Settings" and choose "Legacy Build System" from Dropdown.
        d) Click on Done and then you can build.


For Android ->
    ionic cordova platform add android
    ionic cordova build android
    <!-- If Device is Connected, run following command -->
    ionic cordova run android --device


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