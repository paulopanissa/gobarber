import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';
import { pagination } from '../helpers';

class ScheduleController {
  async index(req, res) {
    const checkUserIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserIsProvider) {
      return res.status(401).json({
        error: 'User is not a provider',
      });
    }

    const { page = 1, limit = 20, date } = req.query;

    const parsedDate = parseISO(date);

    const apppoitments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
      limit,
      offset: (page - 1) * limit,
    });

    const total = await Appointment.count({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
    });

    const paginate = pagination(total, page, limit);

    return res.json({ apppoitments, paginate });
  }
}

export default new ScheduleController();
