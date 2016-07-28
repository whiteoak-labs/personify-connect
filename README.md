#Maven driven Personify Connect Cordova Application
Author [Timothy Cook](mailto:whiteoaklabs@gmail.com) 

###Tool Requirements
* [Maven](https://maven.apache.org)
* [NodeJS](https://nodejs.org/en) Current not LTS
* Phonegap CLI Node Module
* XCode (for building iOS platform)
    * iOS SDK
    * XCode CLI 
* Android SDK (for build Android platform)
    * Android SDK Tools
    * Android SDK Platform Tools
    * Android SDK Platform, I suggest using the latest
    * Android Support Repository
    * Google Play Services
    * Google Repository

###Developer Environment Setup
Install Maven and make sure the Maven executable (mvn) is available on the system path.
Install NodeJS and make sure that NodeJS executable (node) and Node Package Manager (npm) are available on the system path.
Install Phonegap CLI Node package using npm
    * npm install -g phonegap 

###Project Structure
The project is broken down in to two projects.
* **base**
    * This project contains all the HTML5/JS base code relating to the Sencha Touch framework.
* **gap**
    * This project contains all the Cordova code relating to the Cordova framework.
    * This project has a dependency on the *base* project.
    
###Building
Once the development environment is setup the project can be built for the platform needed.

#####Build Steps
1. Build the **base** project
    * Developer build: from the root of the __base__ project execute the following command: __mvn clean install -o__
    * Automated build: from the root of the __base__ project execute the following command: __mvn clean deploy__
    * With the __base__ project successfully installed/deployed to your Maven repository you can now build the __gap__ project.
2. Build the **gap** project
    * iOS platform: from the root of the __gap__ project execute the following command: __mvn clean package -Dplatform=io__
    * Android platform: from the root of the __gap__ project execute the following command: __mvn clean package -Dplatform=android__
    * _It should be noted that the Maven __clean__ goal it will remove any previous built platforms_
     
####Running

Once the **gap** project has been successfully built it can either be instantly installed onto a device or any emulator using
bundles produced by the build. These bundles will be found under the **gap** projects root directory in the target directory.

####Debugging

Debugging is accomplished one of two ways depending on the type if code needing to be debugged.

1. Base code debugging  
    <p>With the device attached to the developer's machine place device in to developer mode.</br>
    <b>iOS</b>:<br/>
       On the device open Safari settings and go to advanced and enable web inspector.<br/>
       Once web inspector is enabled and select the device is attached to your OSX machine start Safari on OSX.<br/> 
       From the Developer menu choose the device you wish to debug the JavaScript<br/>
    <b>Android</b>:<br/> 
       Place  device into developer mode from Settings > About Phone > Tap Build number 7x.          
       Once developer mode is activated access the Developer options from  Settings > Developer options.<br/> 
       Turn on Developer options and scroll down and enable USB debugging.<br/>
       Open chrome and access the device from the following URL: <i>chrome://inspect</i><br/>
       Please note that you will need the correct USB drivers installed in order for your machine to recognize the Android device.</p>        
2. Gap code debugging
    <p>With the device attached to the developer's machine open the project file for the specific platform. The project
    files can be found in the __gap__ project's platforms directory and simply import into your desired IDE. Keep in mind
    iOS can only be debugged from an OSX machine with XCode installed.</p>
 