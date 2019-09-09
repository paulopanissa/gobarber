import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import User from '../models/User';
import WorkSchedule from '../models/WorkSchedule';
import Appointment from '../models/Appointment';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;
    const { providerId } = req.params;

    if (!date) {
      return res.status(400).json({
        error: 'Invalid date',
      });
    }

    const searchDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    /**
     * Buscar os Horarios Serviço do Provider
     */

    const schedule = await WorkSchedule.findAll({
      where: { provider_id: providerId },
      attributes: ['date'],
    });

    // const schedule = dbSchedule.map(item => item.date);

    const available = schedule.map(({ date }) => {
      const [hour, minute] = date.split(':');
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      return {
        time: date,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date()) &&
          !appointments.find(a => format(a.date, 'HH:mm') === date),
      };
    });

    return res.json(available);
  }
}

export default new AvailableController();
