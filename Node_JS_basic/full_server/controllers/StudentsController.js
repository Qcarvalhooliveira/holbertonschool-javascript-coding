import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const database = await readDatabase('./database.csv');
     
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
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
