# Gaia Project





### Demo webpage for Game Map and Players 
map_players_show_on_webpage

```
how to start demo webpage
cd map_players_show_on_webpage
npm install
npm start


```

```
this is a react website to show the game map and players.
the data comes from firebase.
listen the paths of
game/[gid]/players
game/[gid]/players

when load data or on data change will reload webpage.

for example: current code  game id is 2
firebase.database().ref('game/2/mapboard');
firebase.database().ref('game/2/players');


```




### Game Logic

src/logic


### TestCase for Game Logic

src/tests

### Driver for Demo 

src/driver/driver.ts

```
cd dist/driver
node driver.js

keep pressing enter button will demo data change on webapge

how it works?
drive saves game data to firebase by call game.saveGame()

as you can see. In driver code, Game initialize with gid = 2. like  let g = new Game(2) . that make sure driver share same firebase path with demo webpage.


```
### Game interface for frontend Player   

```
player send instance of Request Class by (API/firebase/socketIO).
game processing request by three function:
processRoundRooter  setup 
processSetupFirstStructures  setup
processPlayerRequest 

```



### Need to do

src/race
```
special benefit of Planetary Institute in Faction Boards. for example in Gaia phase of Terrans. exchange power of gaia to other resoures. 
special skill of right - top of faction boards. need test

```

src/ScoringBoard.ts
```
test case: not fully tested

```

others

```
the order of roundbooster at seup. (According to rulebook page 7, Starting with the last player and continuing in counterclockwise order).  
in code, place first structure in the order of 0 1 2 3 3 2 1.  order of roundbooster is 0 1 2 3

```

```
special action: QIC exchange missing (right bottom of techboard)

```







