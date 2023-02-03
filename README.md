# MMM-WikipediaFacts
Module shows scraped facts from czech [wikipedia](https://cs.wikipedia.org/wiki/Wikipedie:Zaj%C3%ADmavosti/N%C3%A1vrhy). The module scrapes all facts at startup and then displays them randomly at a configurable interval. **Only czech language is supported !**

![Wikipedia facts module screenshot](screenshots/screenshot_wikipediafacts.png)

## Installation
Navigate into MagicMirror's modules folder using terminal:
```
cd ~/MagicMirror/modules
```
Clone this repository using following command: 
```
git clone https://github.com/Th0be/MMM-WikipediaFacts.git
```
Navigate into module folder and install dependencies using:
```
cd MMM-WikipediaFacts
npm install
```
Add the following text to ```MagicMirror/config/config.js``` to activate the module:
```
{
    module: "MMM-WikipediaFacts",
    position: "bottom_bar", // You can change this to your desired position, but I recommend bottom bar.
    config: {
        // Here you can insert options listed below.
    }
},
```

## Configuration options
| **Option** | **Type**  | **Default** | **Description** |
| ---------- | --------- | ----------- | --------------- |
| showTitle | ```boolean```  | ```true``` | Show title of module. |
| updateInterval | ```number``` | ```10 * 1000``` | Interval of fact change  (in milliseconds). |
| animationSpeed | ```number```  | ```2.5 * 1000``` | Animation speed of fact change (in milliseconds). |

## To do list
+ Filter by header
+ Filter by comments questioning fact

## Issues and pull request
If you find any issues with this module, feel free to open a issue or to fix it and make a pull request in this repository.