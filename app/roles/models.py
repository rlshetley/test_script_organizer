from app import db
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Boolean

class Role(Object):
    id = Column(Integer, primary_key=True)
    name = Column(String(225),  nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }
