
// ************************************************
// THIS PAGE REQUIRES EXPERIMENTER INPUT
// ************************************************

// don't change these import statements
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/performance";
import "firebase/analytics";
import { writable } from 'svelte/store';

// ************************************************
// ************************************************
// ************************************************
// ************************************************
// USER VARIABLES (FILL STUFF IN BELOW THIS LINE)
// ************************************************
// ************************************************
// ************************************************
// ************************************************

// lab variables
export const studyLocation = 'Dartmouth'; // location of lab running mturk study
export const labName = 'FINNLab'; // name of lab running HIT experiment 
export const email = 'Rekha.S.Varrier@dartmouth.edu'; // lab email for mturk
export const studyAim = 'to learn how people perceive social interactions'; // aim of mturk study 
export const studyTasks = 'paying attention to the video'; // brief summary of HIT task for consent form
export const experiment = 'socialness'; // name of experiment (should match collection name in firebase)

// HIT variables
export const HITPay = '2.00'; // pay for HIT completion (format as X.XX with no dollar sign)
export const userGroup = 'demo'; // name of collection of participants for current HIT
export const estHITTime = '5'; // estimated time to complete HIT (in minutes)
export const totalHITTime = estHITTime * 2; // total time provided for HIT (in minutes)

// stimuli variables      
export const ratingTypes = ['social']; // array of rating types   

// this configures path to proper firebase
// COPY AND PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyAQp50cn5lPYLWP1JpTjFE5G7S7G753xH0",
  authDomain: "hcpratings.firebaseapp.com",
  databaseURL: "https://hcpratings.firebaseio.com",
  projectId: "hcpratings",
  storageBucket: "hcpratings.appspot.com",
  messagingSenderId: "592093858242",
  appId: "1:592093858242:web:686ff8aa3afe9de4a9ae5b",
  measurementId: "G-77XDY995WP"
};
// ************************************************
// ************************************************
// ************************************************
// ************************************************
// STOP. DON'T CHANGE ANYTHING BELOW THIS LINE
// ************************************************
// ************************************************
// ************************************************
// ************************************************

// dev is referenced as a store elsewhere in the code, so cannot be a simple Boolean
// eslint-disable-next-line no-undef
export const dev = DEV_MODE ? writable(true) : writable(false);

// firebase info (export for use elsewhere in app)
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const serverTime = firebase.firestore.Timestamp.now();

// Functions to parse the URL to get workerID, hitID, and assignmentID
const unescapeURL = (s) => decodeURIComponent(s.replace(/\+/g, '%20'));
export const getURLParams = () => {
    const params = {};
    let url = window.location.href;
    let m = window.location.href.match(/[\\?&]([^=]+)=([^&#]*)/g);
    
    if (m) {
        let i = 0;
        while (i < m.length) {
            const a = m[i].match(/.([^=]+)=(.*)/);
            params[unescapeURL(a[1])] = unescapeURL(a[2]);
            i += 1;
        }
    }
    if (!params.workerId && !params.assignmentId && !params.hitId) {
        // eslint-disable-next-line no-undef
        if (DEV_MODE) {
            console.log(
                'App running in dev mode so HIT submission will not work!\nTo test in the sandbox make sure to deploy the app.'
            );
            params.workerId = 'test-worker';
            params.assignmentId = 'test-assignment';
            params.hitId = 'test-hit';
            params.turkSubmitTo = 'test-submit';
        }
    }
    return params;
};

// Use those functions to get the window URL params and make them available throughout the app
export const params = getURLParams();