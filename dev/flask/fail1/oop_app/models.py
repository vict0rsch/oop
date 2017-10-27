import os
import datetime
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

local_path = os.path.dirname(os.path.realpath(__file__))
db_path = 'sqlite:///' + local_path + 'test.db'

engine = create_engine(db_path, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()


class Developer(Base):
    __tablename__ = 'developers'
    id = Column(Integer, primary_key=True)
    name = Column(String(20))
    hireDate = Column(Date)
    focus = Column(String(50))

    def __init__(self, name, hireDate, focus):
        self.name = name
        self.hireDate = datetime.datetime.strptime(
            hireDate, "%d%m%Y").date()
        self.focus = focus

    def __repr__(self):
        return '<Developer %r>' % (self.name)
