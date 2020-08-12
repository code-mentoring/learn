import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import md5 from 'md5';
import { Repository } from 'typeorm';
import { UserInput, UserWithPassword } from './User.entity';


enum StreakState {
  noHistory,
  needsReset,
  completedYesterday,
  completedToday,
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserWithPassword)

    private readonly userRepository: Repository<UserWithPassword>
  ) { }

  async findAll(): Promise<UserWithPassword[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async search(query: string): Promise<UserWithPassword[]> {
    return this.userRepository.find({
      where: [{ firstName: query }, { lastName: query }, { email: query }]
    });
  }

  async create(input: UserInput): Promise<UserWithPassword> {
    const user = this.userRepository.create(input);
    user.password = await bcrypt.hash(input.password, 10);
    // When in production add
    // ?r=pg&d=https:%3A%2F%2Fapi.codementoring.co%2Fstatic%2Fdefault-profile.svg;
    // to end of profileImage URL.
    user.profileImage = `https://www.gravatar.com/avatar/${md5(input.email)}`;
    return this.userRepository.save(user);
  }

  /**
   * Did the user complete a module yesterday (normalize to 12am)
   * Returns:
   *  true = Skipped
   *  false = Not skippped. Increment
   *  null = Not skipped. Already completed today. Don't increment
   * @param userId User to check
   */
  private async _streakState(user: UserWithPassword): Promise<StreakState> {

    // Normalize to 12am today
    const now = new Date();

    now.setHours(0);
    now.setMinutes(0);

    if (!user.updatedStreak) return StreakState.noHistory;
    const lastCompleted = new Date(user.updatedStreak.getTime());

    // Normalize to 12am completed
    lastCompleted.setHours(0);
    lastCompleted.setMinutes(0);

    const diffInHours = Math.floor((now.valueOf() - lastCompleted.valueOf()) / 1000 / 60 / 60);

    if (diffInHours === 0) return StreakState.completedToday; // DON'T increment streak
    if (diffInHours > 24) return StreakState.needsReset;
    return StreakState.completedYesterday;
  }


  /**
   * retreive and or reset streak for not completeing modules
   * @param user
   */
  async getOrResetStreak(userId: string) {
    const u = await this.userRepository.findOneOrFail(
      { id: userId },
      { select: ['id', 'streak', 'updatedStreak'] }
    );

    const state = await this._streakState(u);

    switch (state) {
      // @ts-ignore
      case StreakState.needsReset:
        await u.setStreak(0);
      // eslint-disable-next-line no-fallthrough
      case StreakState.noHistory:
        return 0;
      default:
        return u.streak;
    }
  }


  /**
   * Retreive and or extend streak of completing modules
   * @param user
   */
  async incrementStreak(userOrId: string | UserWithPassword) {
    const user = (typeof userOrId === 'string')
      ? await this.userRepository.findOneOrFail({ id: userOrId })
      : userOrId;

    const state = await this._streakState(user);

    switch (state) {
      case StreakState.needsReset:
        await user.setStreak(0);
        break;
      case StreakState.noHistory:
      case StreakState.completedYesterday:
        await user.setStreak(user.streak + 1);
        break;
      default:
    }

    return user.streak;
  }
}
