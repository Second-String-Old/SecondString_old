#include <iostream>
#include <fstream>
#include <cmath>
#include <string>
#include <list>
#include <vector>
#include <cassert>
#include <ctime>
#include <cstdlib>



int main(int argc, char* argv[]) 
{
	std::ifstream statsin(argv[1]);
	std::string x;
	std::vector<std::string> input;
	std::vector<std::string> players;


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
	
	//std::cout<<input.size()<<std::endl;
	while(statsin >> x)
	{
		input.push_back(x);
	}
	//std::cout<<input.size()<<std::endl;
	//std::cout<<input[1]<<std::endl;
	

	for(int i=0; i<input.size(); ++i)
	{
		for(int j=0; j<10; ++j)
		{

			if(input[i][0]==nums[j][0]&& input[i][0+1]=='-'||input[i][0]==nums[j][0]&& input[i][0+2]=='-')
			{
				std::string name;
				int count =0;
				/*for(int z=0; z<input[i].length(); ++z)
				{
					if(input[i][z]!=' ')
					{
						count++;
					}
					else
					{
						for(int q=0; q<count; ++q)
						{
							name+=input[i][q];
						}
					}
				}*/
				players.push_back(input[i]);
			}
		}	
	}

	std::cout<<players.size()<<std::endl;
	for(int i=0; i<players.size(); ++i)
	{
		std::cout<<players[i]<<std::endl;
	}
	
	
	
}