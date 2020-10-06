import ReactOtron from 'reactotron-react-native';

if(__DEV__) {
    const tron = ReactOtron
    .configure({
        host: 'YOU IP LOCALHOST'
    })
    .useReactNative()
    .connect();

    console.tron = tron;

    tron.clear();
}