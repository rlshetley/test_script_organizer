from app import db
from sqlalchemy import Column, Integer, ForeignKey, String


class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(Integer, primary_key=True)
    name = db.Column(String(225),  nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }
