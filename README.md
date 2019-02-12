# KR-censorship-190211
Check your network was influenced by ServerName based censorship deployed at KT on 2019-02-11

## What? Censorship?
Since 2019-02-11, KT started to censor the HTTPS traffic with ServerName header (host:) which is usually used in identifying ServerName in VirtualHosts    
Since 2019-02-12, Korea Communications Commission openly admitted that they will censor the HTTPS traffic. [Official Tweet from KCC](https://twitter.com/withkcc/status/1095183792057200645)  
This software is for detecting any censoring system by sending a HTTPS request to [google.com](https://google.com) with modified servername in ServerHello Request or host header
  
According to the [inspection of ](https://twitter.com/perillamint/status/1085545671506255872)[perillamint](https://github.com/perillamint), 
KT [is sending TCP RST](https://twitter.com/perillamint/status/1094918736429993984) when it's serverName is in the blocked site list.  

## So what does this script do?
This script first downloads the blocked url list from firebase firestore database.  
(will fallback to offline.ts if there is no internet connection, since KCC is bullshit enough to block GitHub)  
And then the script sends a request to google server with downloaded fake serverNames to trigger blocking system.  
if you are not influenced by this censorship, you should get invalid cert error from google server since it is not in the certificate alt-name list:  
but if you are influenced, your request will be dropped.

## OK, How can I run it?
### Compile and Run it by yourself
First, install some dependencies by `npm install`,  
Then, start the script via command `npm start`

### Create a precompiled program by yourself
install `pkg` from npm and run `pkg .`

### Use Precompiled Program
[Go to Releases](https://github.com/Alex4386/KR-censorship-190211/releases) to download precompiled binary. (Windows, macOS, Linux for x64 Systems only)

## Technologies used
* [Typescript](https://typescriptlang.org), JavaScript that scales!
* [request](https://github.com/request/request), Easy to use http request library
* [Node.JS](https://nodejs.org), A JavaScript Runtine built on V8 Engine
* [Firebase](https://firebase.google.com), A liberator of backend-developers
  
## Contributors
* [Alex4386](https://github.com/Alex4386) - A pseudo-Programmer
* [park012241](https://github.com/park012241) - *the REAL Programmer*  

## License
WTFPL
