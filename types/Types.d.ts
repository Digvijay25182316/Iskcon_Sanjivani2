interface ActivityData {
  id: number;
  description?: string;
  programId: number;
  programName: string;
  programLocation: string;
  programType: string;
  audienceType: string;
  levelId: number;
  levelNumber: number;
  levelName: string;
  levelStatus: string;
  participantId: number;
  participantFirstName: string;
  participantLastName: string;
  participantWaNumber: string;
  participantContactNumber: string;
  participantEmail?: string;
  activityId: number;
  activityName: string;
  activityDescription: string;
  scheduledSessionId: number;
  scheduledSessionName: string;
  sessionId: number;
  sessionCode: string;
  sessionName: string;
  courseId: number;
  courseCode: string;
  courseName: string;
  rsvp: string;
  activityDate: string;
}

interface LevelsData {
  id: string;
  number: string;
  name: string;
  description: string;
  programName: string;
  programId: string;
  preacher1: string;
  preacher2: string;
  mentor: string;
  coordinator: string;
  status: string;
  attendanceUrl: string;
  expectedStartDate: string;
  actualStartDate: string;
  expectedEndDate: string;
  actualEndDate: string;
  createdBy: string;
  created: string;
  modified: string;
}

interface ActivityMaster {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  created: string;
  modified: string;
}

interface Sessions {
  id: string;
  code: string;
  name: string;
  description: string;
  courseCode: string;
  durationInMinutes: string;
  videoUrl: string;
  presentationUrl: string;
  notesUrl: string;
  created: string;
  modified: string;
}

interface ScheduledSessions {
  id: string;
  name: string;
  courseName: string;
  sessionId: string;
  sessionName: string;
  levelId: string;
  programId: string;
  programName: string;
  startTime: string;
  createdBy: string;
  created: string;
  modified: string;
}

interface responseDataFetched<T> {
  response: {
    content: T[];
    pageable: {
      pageNumber: 0;
      pageSize: 10;
      sort: [Object];
      offset: 0;
      unpaged: false;
      paged: true;
    };
    totalElements: 8;
    totalPages: 1;
    last: true;
    size: 10;
    number: 0;
    sort: { sorted: true; empty: false; unsorted: false };
    numberOfElements: 8;
    first: true;
    empty: false;
  };
}

interface VolunteerTypes {
  id: 0;
  firstName: string;
  lastName: string;
  initiatedName: string;
  waNumber: string;
  contactNumber: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
  serviceInterests: string;
  currentServices: string;
  createdBy: string;
  created: string;
  modified: string;
}

interface CourseMasterData {
  id: string;
  code: string;
  name: string;
  description: string;
  createdBy: string;
  created: string;
  modified: string0;
}

interface ProgramsData {
  id: string;
  name: string;
  preacher: string;
  coordinator: string;
  mentor: string;
  incharge: string;
  type: string;
  audienceType: string;
  location: string;
}

interface SadhanaTypes {
  id: string;
  programId: string;
  programName: string;
  participantId: string;
  participantFirstName: string;
  participantLastName: string;
  participantWaNumber: string;
  participantContactNumber: string;
  numberOfRounds: string;
  earlyJapaRoundsBefore8AM: string;
  earlyJapaRoundsAfter8AM: string;
  first8RoundsCompletedTime: string;
  next8RoundsCompletedTime: string;
  wakeUpTime: string;
  sleepTime: string;
  prabhupadaBookReading: string;
  nonPrabhupadaBookReading: string;
  prabhupadaClassHearing: string;
  guruClassHearing: string;
  otherClassHearing: string;
  speaker: string;
  attendedArti: string;
  mobileInternetUsage: string;
  sadhanaDate: string;
  created: string;
  modified: string6;
}

interface PariticipantData {
  firstName: string;
  lastName: string;
  contactNumber: string;
  dob: string;
  gender: string;
}
