# React Native Development (Preferred : macOS)

Use Official Site for Environment Setup [React Native](https://reactnative.dev/docs/environment-setup)



## Setting Up the Project

Git Clone the repo

```bash
git clone https://github.com/trustlessCapital/tcap-mobile.git
```

## Installing dependencies
Run the below command in the root directory

```python
yarn 
```
You should use [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) instead of npm.

## Android Setup
Visit the "android" folder inside the root directory and add
[local.properties](https://stackoverflow.com/questions/20673378/where-does-local-properties-go-for-android-project) file to it.

Run the command below in the root directory to start android development.

```python
react-native run-android 
```
Make sure you have an Emulator running or a testing device is connected with usb debugging enabled.

## Ios Setup
Visit "ios" folder present in the root directory and run the below command
```python
pod install
```
After pods installation is completed, Run the below command in the root directory
```python
react-native run-ios 
``` 

## License
[GPL3](https://github.com/trustlessCapital/tcap-mobile/blob/master/LICENSE)
