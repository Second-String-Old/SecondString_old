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



int main(int argc, char* argv[]) 
{
	std::ifstream statsin(argv[1]);
	std::ifstream playersin(argv[2]);

	std::string x;
	std::vector<std::string> input;
	std::vector<std::string> players;
	std::vector<std::string> roster;
	std::vector<Player> obs;



	//char arr[] = {'A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z'};
	std::vector<std::string> nums;
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
	
	
	while(statsin >> x)
	{
		input.push_back(x);
	}
	while(playersin >> x)
	{
		roster.push_back(x);
	}
	//std::cout<<input.size()<<std::endl;
	//std::cout<<roster.size()<<std::endl;
	

	for(int i=0; i<input.size(); ++i)
	{
		for(int j=0; j<10; ++j)
		{

			if(input[i][0]==nums[j][0]&& input[i][0+1]=='-'||input[i][0]==nums[j][0]&& input[i][0+2]=='-')
			{
				std::string name;
				int count =0;
				players.push_back(input[i]);
			}
		}	
	}

	

	for(int i=0; i<players.size(); ++i)
	{
		std::string pnum="";
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
	std::cout<<obs.size()<<std::endl;



	
	for(int i=0; i<10; ++i)
	{
		std::string name = obs[i].get_fname()+" "+obs[i].get_lname();
		std::string num = obs[i].get_num();
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
		std::cout<<"{"<<std::endl;
		std::cout<<"\t'name':'"+name+"',"<<std::endl;
		std::cout<<"\t'POS':'"+obs[i].get_pos()+"',"<<std::endl;
		std::cout<<"\t'team':'"+obs[i].get_team()+"',"<<std::endl;
		std::cout<<"\t'num':'"+num+"',"<<std::endl;
		std::cout<<"\t'gp':"<<obs[i].get_gp()<<","<<std::endl;
		std::cout<<"\t'att':"<<obs[i].get_att()<<","<<std::endl;
		std::cout<<"\t'rushyards':"<<obs[i].get_rushyards()<<","<<std::endl;
		std::cout<<"\t'rushtuddies':"<<obs[i].get_rushtds()<<","<<std::endl;
		std::cout<<"\t'recs':"<<obs[i].get_recs()<<","<<std::endl;
		std::cout<<"\t'tars':"<<obs[i].get_tars()<<","<<std::endl;
		std::cout<<"\t'recyards':"<<obs[i].get_recyards()<<","<<std::endl;
		std::cout<<"\t'rectuddies':"<<obs[i].get_rectds()<<","<<std::endl;
		std::cout<<"\t'comp':"<<obs[i].get_comp()<<","<<std::endl;
		std::cout<<"\t'passatt':"<<obs[i].get_patts()<<","<<std::endl;
		std::cout<<"\t'pyards':"<<obs[i].get_pyards()<<","<<std::endl;
		std::cout<<"\t'ptds':"<<obs[i].get_ptds()<<","<<std::endl;
		std::cout<<"\t'ints':"<<obs[i].get_interceptions()<<","<<std::endl;
		std::cout<<"\t'fum':"<<obs[i].get_fum()<<","<<std::endl;
		std::cout<<"\t'fumlost':"<<obs[i].get_fumlost()<<","<<std::endl;
		std::cout<<"}"<<std::endl;
	}

	
	
	
}