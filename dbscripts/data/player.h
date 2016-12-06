#ifndef player_h
#define player_h

#include <cmath>
#include <string>
#include <iostream>


class Player 
{
  // internal representation
private:
  std::string fname;
  std::string lname;
  std::string team;
  std::string pos;
  std::string num;
  int gp;
  int att;
  int rushyards;
  int rushtds;
  int recs;
  int tars;
  int recyards;
  int rectds;
  int comp;
  int patts;
  int pyards;
  int ptds;
  int interceptions;
  int fum;
  int fumlost;

public:
  // Constructor Functions
  Player(std::string fname_, std::string lname_) : fname(fname_), lname(lname_) {}
  Player(std::string fname_, std::string lname_, std::string pos_, std::string team_, std::string num_) : fname(fname_), lname(lname_), pos(pos_), team(team_), num(num_), gp(0), att(0), rushyards(0), rushtds(0), recs(0), tars(0), recyards(0), rectds(0), comp(0), patts(0), pyards(0), ptds(0), interceptions(0), fum(0), fumlost(0)   {}


  // Accessor Functions
  std::string get_fname() const { return fname; }
  std::string get_lname() const { return lname; }
  std::string get_pos() const { return pos; }
  std::string get_team() const { return team; }
  std::string get_num() const { return num; }

  int get_gp() const { return gp; }
  int get_att() const { return att; }
  int get_rushyards() const { return rushyards; }
  int get_rushtds() const { return rushtds; }
  int get_recs() const { return recs; }
  int get_tars() const { return tars; }
  int get_recyards() const { return recyards; }
  int get_rectds() const { return rectds; }
  int get_comp() const { return comp; }
  int get_patts() const { return patts; }
  int get_pyards() const { return pyards; }
  int get_ptds() const { return ptds; }
  int get_interceptions() const { return interceptions; }
  int get_fum() const { return fum; }
  int get_fumlost() const { return fumlost; }

};


#endif