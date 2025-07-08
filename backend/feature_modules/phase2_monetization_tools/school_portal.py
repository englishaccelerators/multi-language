# Teacher + student dashboard logic
class School:
    def __init__(self, name):
        self.name = name
    def assign_student(self, student):
        return f'{student} assigned to {self.name}'