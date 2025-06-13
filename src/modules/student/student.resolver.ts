import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('Student')
export class StudentResolver {
  //static database
  private students: Array<{
    id: string;
    name: string;
    idCard: string;
    className: string | null;
  }> = [
    {
      id: '1',
      name: 'John Doe',
      idCard: '123456789',
      className: '1A',
    },
    {
      id: '2',
      name: 'Jane Smith',
      idCard: '987654321',
      className: '1B',
    },
    {
      id: '3',
      name: 'Alice Johnson',
      idCard: '456789123',
      className: '2A',
    },
    {
      id: '4',
      name: 'Bob Brown',
      idCard: '321654987',
      className: '2B',
    },
  ];

  @Query('students')
  getAllStudents() {
    return this.students;
  }

  //enroll student in class
  @Mutation('enrollStudent')
  enrollStudent(
    @Args('name') name: string,
    @Args('idCard') idCard: string,
    @Args('className') className: string | null,
  ) {
    const newStudent = {
      id: (this.students.length + 1).toString(),
      name,
      idCard,
      className,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  //remove student from class
  @Mutation('removeStudentFromClass')
  removeStudentFromClass(@Args('id') id: string) {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id,
    );
    if (studentIndex === -1) {
      throw new Error('Student not found');
    }
    // Set className to null to remove from class
    this.students[studentIndex].className = null;
    return true;
  }

  @Mutation('updateStudent')
  updateStudent(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('idCard') idCard: string,
    @Args('className') className: string | null,
  ) {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id,
    );
    if (studentIndex === -1) {
      throw new Error('Student not found');
    }
    const updatedStudent = {
      ...this.students[studentIndex],
      name,
      idCard,
      className,
    };
    this.students[studentIndex] = updatedStudent;
    return updatedStudent;
  }

  @Query('getStudentByClass')
  getStudentByClass(@Args('className') className: string) {
    return this.students.filter((student) => student.className === className);
  }
}
