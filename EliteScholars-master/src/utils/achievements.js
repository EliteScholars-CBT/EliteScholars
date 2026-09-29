import { ACHIEVEMENTS } from './constants';
import { loadAchievements, saveAchievements, loadSubjectPerformance } from './storage';

export function checkAndAwardAchievements(userStats, email, showToast, showAchievement) {
  const currentAchievements = loadAchievements(email);
  const newAchievements = [];
  const subjectPerformance = loadSubjectPerformance(email);

  // Total quizzes completed
  if (!currentAchievements.includes('firstQuiz') && userStats.totalQuizzes >= 1) {
    newAchievements.push('firstQuiz');
  }
  if (!currentAchievements.includes('fiveQuizzes') && userStats.totalQuizzes >= 5) {
    newAchievements.push('fiveQuizzes');
  }
  if (!currentAchievements.includes('tenQuizzes') && userStats.totalQuizzes >= 10) {
    newAchievements.push('tenQuizzes');
  }

  // Perfect score
  if (!currentAchievements.includes('perfectScore') && userStats.perfectScores >= 1) {
    newAchievements.push('perfectScore');
  }
  
  // 90%+ score
  if (!currentAchievements.includes('ninetyPlus') && userStats.ninetyPlusCount >= 1) {
    newAchievements.push('ninetyPlus');
  }

  // Streak achievements
  if (!currentAchievements.includes('streak7') && userStats.streak >= 7) {
    newAchievements.push('streak7');
  }
  if (!currentAchievements.includes('streak30') && userStats.streak >= 30) {
    newAchievements.push('streak30');
  }

  // All subjects attempted
  if (!currentAchievements.includes('allSubjects')) {
    const subjectsAttempted = Object.keys(subjectPerformance).filter(s => subjectPerformance[s].total > 0).length;
    if (subjectsAttempted >= 9) {
      newAchievements.push('allSubjects');
    }
  }

  // Speed demon (finish with time to spare)
  if (!currentAchievements.includes('speedDemon') && userStats.speedDemonCount >= 1) {
    newAchievements.push('speedDemon');
  }

  // Subject mastery (80%+ in a subject)
  const masterySubjects = ['mathematics', 'physics', 'chemistry', 'biology', 'economics', 'accounting', 'literature', 'government', 'english', 'novel'];
  masterySubjects.forEach(subject => {
    const achievementId = `${subject}Mastery`;
    const achievementKey = subject === 'mathematics' ? 'mathematician' : 
                          subject === 'physics' ? 'physicist' :
                          subject === 'chemistry' ? 'chemist' :
                          subject === 'biology' ? 'biologist' :
                          subject === 'economics' ? 'economist' :
                          subject === 'accounting' ? 'accountant' :
                          subject === 'literature' ? 'literatureLover' :
                          subject === 'government' ? 'governmentGuru' :
                          subject === 'english' ? 'englishExpert' :
                          subject === 'novel' ? 'novelReader' : null;
    
    if (achievementKey && !currentAchievements.includes(achievementKey)) {
      const subjectStat = subjectPerformance[subject];
      if (subjectStat && subjectStat.bestScore >= 80) {
        newAchievements.push(achievementKey);
      }
    }
  });

  // Perfect week (quiz every day for 7 days)
  if (!currentAchievements.includes('perfectWeek') && userStats.perfectWeek) {
    newAchievements.push('perfectWeek');
  }

  // Save new achievements and show popups
  if (newAchievements.length > 0) {
    const updatedAchievements = [...currentAchievements, ...newAchievements];
    saveAchievements(updatedAchievements, email);
    
    newAchievements.forEach(achievementId => {
      const achievement = ACHIEVEMENTS[achievementId];
      if (achievement) {
        showToast(`${achievement.name} unlocked!`, 'achievement');
        showAchievement(achievement);
      }
    });
  }

  return newAchievements;
}

export function getUserAchievements(email) {
  const achievementIds = loadAchievements(email);
  return achievementIds.map(id => ACHIEVEMENTS[id]).filter(a => a);
}
