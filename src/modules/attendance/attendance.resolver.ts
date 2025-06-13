import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

enum AttendanceStatus {
  P = 'P', // Present
  A = 'A', // Absent
  L = 'L', // Late
  AP = 'AP', // Absent with Permission
}

@Resolver('Attendance')
export class AttendanceResolver {
  //static database
  private attendanceRecords: Array<{
    session: string;
    status: AttendanceStatus;
    studentId: number;
    marker: string | null;
  }> = [
    {
      session: '2025-06-13-09:00',
      status: AttendanceStatus.P,
      studentId: 1001,
      marker: 'On time',
    },
    {
      session: '2025-06-13-09:00',
      status: AttendanceStatus.L,
      studentId: 1002,
      marker: 'Arrived 15 minutes late',
    },
    {
      session: '2025-06-13-09:00',
      status: AttendanceStatus.A,
      studentId: 1003,
      marker: null,
    },
    {
      session: '2025-06-13-14:00',
      status: AttendanceStatus.P,
      studentId: 1001,
      marker: 'Perfect attendance',
    },
    {
      session: '2025-06-13-14:00',
      status: AttendanceStatus.AP,
      studentId: 1004,
      marker: 'Medical appointment',
    },
    {
      session: '2025-06-14-09:00',
      status: AttendanceStatus.P,
      studentId: 1005,
      marker: 'Early arrival',
    },
    {
      session: '2025-06-14-09:00',
      status: AttendanceStatus.L,
      studentId: 1006,
      marker: 'Traffic delay',
    },
    {
      session: '2025-06-14-14:00',
      status: AttendanceStatus.A,
      studentId: 1007,
      marker: 'Unexcused absence',
    },
    {
      session: '2025-06-15-09:00',
      status: AttendanceStatus.P,
      studentId: 1008,
      marker: null,
    },
    {
      session: '2025-06-15-09:00',
      status: AttendanceStatus.AP,
      studentId: 1009,
      marker: 'Family emergency',
    },
  ];

  @Query('getAttendanceByClass')
  getAttendanceByClass(
    @Args('session') session: string,
    @Args('status') status: AttendanceStatus,
  ) {
    return this.attendanceRecords.filter(
      (record) => record.session === session && record.status === status,
    );
  }

  @Query('getAttendanceByStudent')
  getAttendanceByStudent(@Args('studentId') studentId: number) {
    const studentRecords = this.attendanceRecords.filter(
      (record) => record.studentId === studentId,
    );

    // Count attendance statuses
    const statusCounts: { status: AttendanceStatus; count: number }[] =
      studentRecords.reduce(
        (counts: { status: AttendanceStatus; count: number }[], record) => {
          const existingCount = counts.find(
            (count) => count.status === record.status,
          );
          if (existingCount) {
            existingCount.count++;
          } else {
            counts.push({ status: record.status, count: 1 });
          }
          return counts;
        },
        [],
      );

    return {
      studentId,
      records: studentRecords,
      statusCounts,
      totalSessions: studentRecords.length,
    };
  }

  @Mutation('MarkStudentAttendance')
  MarkStudentAttendance(
    @Args('session') session: string,
    @Args('status') status: AttendanceStatus,
    @Args('studentId') studentId: number,
    @Args('marker') marker: string | null,
  ) {
    const newRecord = {
      session,
      status,
      studentId,
      marker,
    };
    this.attendanceRecords.push(newRecord);
    return newRecord;
  }

  @Mutation('RemoveAttendanceRecord')
  RemoveAttendanceRecord(
    @Args('session') session: string,
    @Args('studentId') studentId: number,
  ) {
    const index = this.attendanceRecords.findIndex(
      (record) => record.session === session && record.studentId === studentId,
    );
    if (index !== -1) {
      return this.attendanceRecords.splice(index, 1)[0];
    }
    return null;
  }
}
