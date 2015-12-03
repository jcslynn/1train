clear
cls

//directly import csv
import delimited "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nfl\week-11-dk-salaries.csv"

//var names are too long, rename em
rename avgpointspergame ppg
rename teamabbrev team

//allow sorting by position
gen pos=.
replace pos=1 if position=="QB"
replace pos=2 if position=="RB"
replace pos=3 if position=="WR"
replace pos=4 if position=="TE"
replace pos=5 if position=="DST"

//player value before calculations, the lower the better
gen spfp = salary / ppg

//format gameinfo and separate into home and away
split gameinfo, p(" ")
drop gameinfo2
drop gameinfo3
split gameinfo1, p("@")
rename gameinfo11 home
rename gameinfo12 away
drop gameinfo1

//+1 if home, -1 if away
gen homeadv =.
replace homeadv = -1 if team == home
replace homeadv = 1 if team == away

clonevar opp = home if homeadv == 1
clonevar opp2 = away if homeadv == -1
replace opp = opp2 if opp == ""
drop opp2
drop home
drop away

//sort on name for merging with plus/minus
sort name

//save current data set
save "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nfl\week-11-dk-salaries.dta", replace

//drop shitty players
drop if ppg < 10


//calcuate formula, recalculate player value
gen calcpts = (ppg + homeadv)
gen calcvalue = salary / calcpts

//sort by calculated value
//gsort +pos +calcvalu

//change order to make data easy to see
order calcvalue, after(ppg)
sort team

save "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nfl\week-11-result.dta", replace

clear
cls

import delimited "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nfl\espn-nfl-vs-pos.csv"

//format datasheet
drop rblink
drop rblinkhref
drop wrlink
drop wrlinkhref
drop telink
drop telinkhref
drop dstlink
drop dstlinkhref
rename ïplayer team_vs_pos
split team_vs_pos, p(" vs. ")
drop team_vs_pos
rename team_vs_pos1 team 
rename team_vs_pos2 pos
order team pos, first

//dont care if theyre on bye
drop if opp == "** BYE **"
split opp, p("@")
replace opp1 = opp2 if opp1 == ""
drop opp
drop opp2
rename opp1 opp
order opp, after(pos)
keep team pos opp avg
rename pos position
rename team opponent
rename opp team
replace position = "DST" if position == "D/ST"

//allow sorting by position
gen pos=.
replace pos = 1 if position == "QB"
replace pos = 2 if position == "RB"
replace pos = 3 if position == "WR"
replace pos = 4 if position == "TE"
replace pos = 5 if position == "DST"
gsort team

save "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nfl\espn-nfl-vs-pos.dta", replace

clear
cls

use "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nfl\week-11-dk-salaries.dta"
gsort team

merge m:1 team pos using "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nfl\espn-nfl-vs-pos.dta" 

//drop if opp != opp_copy

gsort -salary
sort pos, stable

drop if ppg < 7

