// v1 写法（Auth 触发器）
// https://stackoverflow.com/questions/79330593/firebase-cloud-function-cannot-find-module-firebase-functions-v2-auth
const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");

admin.initializeApp();

exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  const db = admin.firestore();
  await db.collection("users").doc(user.uid).set({
    uid: user.uid,
    email: user.email || null,
    emailVerified: !!user.emailVerified,
    name: user.displayName || null,
    avatar: user.photoURL || null,
    provider: user.providerData?.[0]?.providerId || null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    lastLoginAt: admin.firestore.FieldValue.serverTimestamp(),
    role: "user",
    plan: "free",
  },
  {
    merge: true,
  });
});
