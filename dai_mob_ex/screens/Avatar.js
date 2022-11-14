import{ View, Text, Button, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

import { useRef, useState } from 'react';

import React from 'react';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, uploadBytes } from 'firebase/storage'
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import { TextInput } from 'react-native-paper';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2238f8Z0-avq9DI1I15J3wWG3hYp8gLg",
    authDomain: "test-dai-367220.firebaseapp.com",
    projectId: "test-dai-367220",
    storageBucket: "test-dai-367220.appspot.com",
    messagingSenderId: "330281506296",
    appId: "1:330281506296:web:125c505be28f1cd1c3b20d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);



export default function Avatar() {
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const camRef = useRef();

    const [cap,setCap] = useState({uri: 'https://placekitten.com/500/500'});

    const[em, setEm] = useState('');
    const[ps, setPs] = useState('');

    const CreateUser = async () =>{
        const auth = getAuth();
        const create = await createUserWithEmailAndPassword(auth,em,ps);
    }

    const Signin = async () =>{
        const auth = getAuth();
        const signin = await signInWithEmailAndPassword(auth,em,ps);
        console.log("signed in", signin)
    }

    const HandleCapture = async () =>{
        const result = await camRef.current.takePictureAsync({
            quality:0.1,
            scale:0.5
        });
        console.log(result);
        const data = await fetch(result.uri);
        const blob = await data.blob();

        const auth = getAuth();
        console.log("auth", auth.user.uid)
        const storageRef = ref(storage, 'avatar.jpg');
        const upload = await uploadBytes(storageRef, blob);

        console.log("ava upload", upload)
        setCap(result);
    }

    const UploadFile = async ()=>{
        const storageRef = ref(storage, 'myimage.jpg');
        const message = 'This is my message.';
        const result = await uploadString(storageRef, message);
        console.log("uploaded!", result);
    
    }

    

    if(!permission || !permission.granted){
        return <View>
            <Text>No Permission</Text>
            <Button title="Get Permission" onPress={()=>requestPermission()} />
        
        </View>
    }

    return <View>
        <TextInput onChangeText={(txt)=>setEm(txt)} placeholder="email" />
        <TextInput onChangeText={(txt)=>setPs(txt)} placeholder="password" />
        <Camera ref={camRef} style={{width:300, height:300}} type={CameraType.back}>
            <Button title="Capture" style={{width: 300, height: 300}} onPress={()=>HandleCapture()}/>
        </Camera>
        <Button title="Upload file" onPress={()=>UploadFile()}></Button>
        <Image source = {cap} style={{width:100, height:100}} />
        {/* <Camera style={{width:300, height:300}} type={CameraType.front}>
            <Button title="Capture" style={{width:100, height:50}}></Button>
        </Camera> */}

    </View>
}
