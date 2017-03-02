
class Player(object):

    def __init__(self, firstName, lastName, player_id):
        self.first = firstName
        self.last  = lastName
        self.id    = player_id

        self.teams = ''
        self.num   = 0
        self.pos   = 'none'

    def fullname(self):
        return self.first + ' ' + self.last

