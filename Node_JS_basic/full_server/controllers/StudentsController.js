import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const database = await readDatabase('./database.csv');
      const responseData = `This is the list of our students\nNumber of students in CS: ${database.inFields.CS.counter}. List: ${database.inFields.CS.students}\nNumber of students in SWE: ${database.inFields.SWE.counter}. List: ${database.inFields.SWE.students}`;
      res.status(200).send(responseData);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const database = await readDatabase('./database.csv');
      const responseData = `List: ${database.inFields[major].students}`;
      res.status(200).send(responseData);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }

    return undefined;
  }
}

export default StudentsController;
