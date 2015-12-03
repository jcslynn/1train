clear
cls

//directly import csv
import delimited "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nba\15-11-12-dk-salaries.csv"

//var names are too long, rename em
rename avgpointspergame ppg
rename teamabbrev team

//allow sorting by position
gen pos=.
replace pos=1 if position=="PG"
replace pos=2 if position=="SG"
replace pos=3 if position=="SF"
replace pos=4 if position=="PF"
replace pos=5 if position=="C"

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

//fix abbreviations, draftkings uses wrong one
replace team = "Phx" if team == "Pho"
replace opp = "Phx" if opp == "Phx"

//espn keeps fuckin up
replace name = "Manu Ginobili" if name == "Manu GinÃ³bili"

//sort on name for merging with plus/minus
sort name

//save current data set
save "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nba\15-11-12-dk-salaries.dta", replace

clear
cls

//open espn real plus-minus
import delimited "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nba\2014-2015-espn-real-plus-minus.csv"

//set real plus/minus multiplier
gen rpm_mult = (rpm * .001) + 1

split name, p(",")
rename name name_pos
rename name1 name
drop name2
drop name_pos
split team, p("/")
drop team
drop team2
drop team3
rename team1 team

//espn's tryna get all proper and shit
replace name = "Lou Williams" if name == "Louis Williams"

//clean unnecessary columns
drop nextpage
drop nextpagehref
drop nextnextpage
drop nextnextpagehref

//for some reason rank label gets fucked up, sort name for merging
rename ïrk rank
sort name

//save espn's plus/minus data
save "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nba\2014-2015-espn-rpm.dta", replace

clear 
cls

use "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nba\15-11-12-dk-salaries.dta"

merge 1:1 name using "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nba\2014-2015-espn-rpm.dta"

drop _merge
drop if gameinfo == ""
//drop gameinfo

replace rpm_mult = 1 if rpm_mult == .

//save draftking salaries merges with real plus/minus
save "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nba\15-11-12-sal-rpm.dta", replace

clear
cls

//load up current team stats
import delimited "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nba\2015-2016-espn-hollinger-team-stats.csv"

//change full team names to abbreviations, team name is fucked up for whatever reason
rename ïteam team
gen opp = substr(team, 1, 3)

//lakers, clippers, warriors, spurs, nets, jazz, pelicans
replace opp = "LAL" if team == "LA Lakers"
replace opp = "LAC" if team == "LA Clippers"
replace opp = "GS" if team == "Golden State"
replace opp = "SA" if team == "San Antonio"
replace opp = "Bkn" if team == "Brooklyn"
replace opp = "NO" if team == "New Orleans"

//drop unwanted columns
drop team
drop pace
drop ast
drop to
drop orr
drop drr
drop rebr
drop efffg
drop ts
drop offeff
rename defeff opp_pts_allowed

//sort by opp to merge with sal-rpm data
sort opp

save "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nba\2015-2016-espn-hollinger-team-stats.dta", replace

clear
cls

//load up sal-rpm data
use "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nba\15-11-12-sal-rpm.dta"
sort opp
merge m:1 opp using "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nba\2015-2016-espn-hollinger-team-stats.dta"

//drop unwanted columns
drop _merge

//drop shitty players
drop if ppg < 20

//drop if they didnt play much or entry is empty
drop if gp < 30
drop if mpg < 24
drop if team == ""

//calcuate formula, recalculate player value
gen calcpts = (ppg + homeadv) * rpm_mult
gen calcvalue = salary / calcpts

//sort by calculated value
gsort +pos +calcvalu

//change order to make data easy to see
order calcvalue, after(ppg)

save "\\Client\C$\Users\tklose\tk\web-dev\1train\ideas\fantasy-sports\nba\15-11-12-result.dta", replace

