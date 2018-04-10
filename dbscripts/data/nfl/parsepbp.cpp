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

void init(vector<string> &nums, vector<string> &teams, vector<string> &input, vector<string> &roster, ifstream &statsin, ifstream &playersin);

//use is ./program.exe file.csv rosters.txt
//prompted for team name in 3 character code ex. atalanta = ATL
int main(int argc, char* argv[]) 
{
	ifstream statsin(argv[1]);    // input player stats .csv file
	ifstream playersin(argv[2]);  // input team rosters

	vector<string> input;         // vector of player stats 
	vector<string> players;       //
	vector<string> roster;        // vector of team roster
	vector<Player> obs;           // vector of player objects
	vector<string> nums;          // vecotr of available numbers
	vector<string> teams;         //
	string teamname;
	ofstream fileout;


	cout<<"Enter team roster name"<<endl;
	cin>>teamname;

	fileout.open("output.txt");

	init(nums, teams, input, roster,statsin,playersin);     // initialize player numbers and NFL teams	

	for(int i=0; i<input.size(); ++i)
	{
		for(int j=0; j<10; ++j)
		{

			if(input[i][0]==nums[j][0]&& input[i][0+1]=='-'||input[i][0]==nums[j][0]&& input[i][0+2]=='-')
			{
				string name;
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
					Player nextone= Player(roster[j+2], roster[j+1], roster[j+3], teamname,roster[j]);
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

	
	for(int i=0; i<obs.size(); ++i)
	{

		string name = obs[i].get_fname()+" "+obs[i].get_lname();
		string num = obs[i].get_num();
		//remove punctuation from name and num
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
		fileout<<"{"<<endl;
		fileout<<"\t'name':'"+name+"',"<<endl;
		fileout<<"\t'POS':'"+obs[i].get_pos()+"',"<<endl;
		fileout<<"\t'team':'"+obs[i].get_team()+"',"<<endl;
		fileout<<"\t'num':'"+num+"',"<<endl;
		fileout<<"\t'gp':"<<obs[i].get_gp()<<","<<endl;
		fileout<<"\t'att':"<<obs[i].get_att()<<","<<endl;
		fileout<<"\t'rushyards':"<<obs[i].get_rushyards()<<","<<endl;
		fileout<<"\t'rushtuddies':"<<obs[i].get_rushtds()<<","<<endl;
		fileout<<"\t'recs':"<<obs[i].get_recs()<<","<<endl;
		fileout<<"\t'tars':"<<obs[i].get_tars()<<","<<endl;
		fileout<<"\t'recyards':"<<obs[i].get_recyards()<<","<<endl;
		fileout<<"\t'rectuddies':"<<obs[i].get_rectds()<<","<<endl;
		fileout<<"\t'comp':"<<obs[i].get_comp()<<","<<endl;
		fileout<<"\t'passatt':"<<obs[i].get_patts()<<","<<endl;
		fileout<<"\t'pyards':"<<obs[i].get_pyards()<<","<<endl;
		fileout<<"\t'ptds':"<<obs[i].get_ptds()<<","<<endl;
		fileout<<"\t'ints':"<<obs[i].get_interceptions()<<","<<endl;
		fileout<<"\t'fum':"<<obs[i].get_fum()<<","<<endl;
		fileout<<"\t'fumlost':"<<obs[i].get_fumlost()<<","<<endl;
		fileout<<"},"<<endl;
	}
	fileout.close();
}


void init(vector<string> &nums, vector<string> &teams, vector<string> &input, vector<string> &roster, ifstream &statsin, ifstream &playersin)
{
	string x;
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
	teams.push_back("NYJ");
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
