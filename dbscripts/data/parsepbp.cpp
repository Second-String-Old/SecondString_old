#include <iostream>
#include <fstream>
#include <cmath>
#include <string>
#include <list>
#include <vector>
#include <cassert>
#include <ctime>
#include <cstdlib>
#include "player.h"

using namespace std;

void init(vector<string> &nums, vector<string> &teams, vector<string> &input, vector<string> &roster);

//use is ./program.exe file.csv rosters.txt
int main(int argc, char* argv[]) 
{
	ifstream statsin(argv[1]);    // input player stats .csv file
	ifstream playersin(argv[2]);  // input team rosters

	string x;
	vector<string> input;         // vector of player stats 
	vector<string> players;       //
	vector<string> roster;        // vector of team roster
	vector<Player> obs;           // vector of player objects
	vector<string> nums;          // vecotr of available numbers
	vector<string> teams;         //

	init(nums, teams, input, roster);     // initialize player numbers and NFL teams	

	for(int i=0; i<input.size(); ++i)
	{
		for(int j=0; j<10; ++j)
		{

			if(input[i][0]==nums[j][0]&& input[i][0+1]=='-'||input[i][0]==nums[j][0]&& input[i][0+2]=='-')
			{
				string name;
				int count =0;
				players.push_back(input[i]);
			}
		}	
	}

	for(int i=0; i<players.size(); ++i)
	{
		string pnum="";
		if(players[i][1]=='-')
		{
			pnum+= players[i][0];
		}
		else
		{
			pnum+= players[i][0];
			pnum+= players[i][1];
		}
		
		for(int j=0; j<roster.size(); ++j)
		{
			if(pnum[0] == roster[j][0])
			{
			
				if (players[i][2]== roster[j+2][0]||players[i][3]== roster[j+2][0])
				{
					Player nextone= Player(roster[j+2], roster[j+1], roster[j+3], "ATL",roster[j]);
					bool flag = false;
					for(int q=0; q<obs.size(); ++q)
					{
						if(obs[q].get_fname()==roster[j+2] && obs[q].get_lname()==roster[j+1])
						{
							flag=true;
						}
					}
					
					if(!flag)
					{
						obs.push_back(nextone);
					}

				}
			}
		}
	}
	cout<<obs.size()<<endl;

	
	for(int i=0; i<10; ++i)
	{
		string name = obs[i].get_fname()+" "+obs[i].get_lname();
		string num = obs[i].get_num();
		for (int z= 0; z<name.size(); ++z)
    	{
        	if (ispunct(name[z]))
        	{
            	name.erase(z--, 1);
        	}
    	}
    	for (int z= 0; z<num.size(); ++z)
    	{
        	if (ispunct(num[z]))
        	{
            	num.erase(z--, 1);
        	}
    	}
		cout<<"{"<<endl;
		cout<<"\t'name':'"+name+"',"<<endl;
		cout<<"\t'POS':'"+obs[i].get_pos()+"',"<<endl;
		cout<<"\t'team':'"+obs[i].get_team()+"',"<<endl;
		cout<<"\t'num':'"+num+"',"<<endl;
		cout<<"\t'gp':"<<obs[i].get_gp()<<","<<endl;
		cout<<"\t'att':"<<obs[i].get_att()<<","<<endl;
		cout<<"\t'rushyards':"<<obs[i].get_rushyards()<<","<<endl;
		cout<<"\t'rushtuddies':"<<obs[i].get_rushtds()<<","<<endl;
		cout<<"\t'recs':"<<obs[i].get_recs()<<","<<endl;
		cout<<"\t'tars':"<<obs[i].get_tars()<<","<<endl;
		cout<<"\t'recyards':"<<obs[i].get_recyards()<<","<<endl;
		cout<<"\t'rectuddies':"<<obs[i].get_rectds()<<","<<endl;
		cout<<"\t'comp':"<<obs[i].get_comp()<<","<<endl;
		cout<<"\t'passatt':"<<obs[i].get_patts()<<","<<endl;
		cout<<"\t'pyards':"<<obs[i].get_pyards()<<","<<endl;
		cout<<"\t'ptds':"<<obs[i].get_ptds()<<","<<endl;
		cout<<"\t'ints':"<<obs[i].get_interceptions()<<","<<endl;
		cout<<"\t'fum':"<<obs[i].get_fum()<<","<<endl;
		cout<<"\t'fumlost':"<<obs[i].get_fumlost()<<","<<endl;
		cout<<"},"<<endl;
	}
}


void init(vector<string> &nums, vector<string> &teams, vector<string> &input, vector<string> &roster){
	nums.push_back("1");
	nums.push_back("2");
	nums.push_back("3");
	nums.push_back("4");
	nums.push_back("5");
	nums.push_back("6");
	nums.push_back("7");
	nums.push_back("8");
	nums.push_back("9");
	nums.push_back("0");
	teams.push_back("ARI");
	teams.push_back("ATL");
	teams.push_back("BAL");
	teams.push_back("BUF");
	teams.push_back("CAR");
	teams.push_back("CHI");
	teams.push_back("CIN");
	teams.push_back("CLE");
	teams.push_back("DAL");
	teams.push_back("DEN");
	teams.push_back("DET");
	teams.push_back("GB");
	teams.push_back("HOU");
	teams.push_back("IND");
	teams.push_back("JAX");
	teams.push_back("KC");
	teams.push_back("MIA");
	teams.push_back("MIN");
	teams.push_back("NE");
	teams.push_back("NO");
	teams.push_back("NYG");
	teams.push_back("NYJ")
	teams.push_back("OAK");
	teams.push_back("PHI");
	teams.push_back("PIT");
	teams.push_back("SD");
	teams.push_back("SEA");
	teams.push_back("SF");
	teams.push_back("STL");
	teams.push_back("TB");
	teams.push_back("TEN");
	teams.push_back("WAS");
	
	while(statsin >> x)           // pushback player stats to a vector
	{
		input.push_back(x);
	}
	while(playersin >> x)         // pushback player names to a vector
	{
		roster.push_back(x);
	}
}



