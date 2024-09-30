const profile = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      contributions {
        points
      }
      profile {
        reputation
        ranking
      }
      submissionCalendar
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
`;

const recentSubmissions = `
query ($username: String!, $limit: Int) {
  recentSubmissionList(username: $username, limit: $limit) {
     id  
     title
      titleSlug
      timestamp
      statusDisplay
      lang
      time
  }
}`;

const problems = `query ($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
      questionId
      questionFrontendId
      boundTopicId
      title
      titleSlug
      content
      translatedTitle
      translatedContent
      isPaidOnly
      difficulty
      likes
      dislikes
      isLiked
      similarQuestions
      exampleTestcases
      contributors {
          username
          profileUrl
          avatarUrl
      }
      topicTags {
          name
          slug
          translatedName
      }
      companyTagStats
  
      stats
      hints
      solution {
          id
          canSeeDetail
          paidOnly
          hasVideoSolution
          paidOnlyVideo
      }
      status
      sampleTestCase
      metaData
      judgerAvailable
      judgeType
      mysqlSchemas
      enableRunCode
      enableTestMode
      enableDebugger
      libraryUrl
      adminUrl
      challengeQuestion {
          id
          date
          incompleteChallengeCount
          streakCount
          type
      }
      note
  }
}
`;

const daily = `
query {
    activeDailyCodingChallengeQuestion {
        date
        link
        question {
            questionId
            questionFrontendId
            boundTopicId
            title
            titleSlug
            content
            translatedTitle
            translatedContent
            isPaidOnly
            difficulty
            likes
            dislikes
            isLiked
            similarQuestions
            exampleTestcases
            contributors {
                username
                profileUrl
                avatarUrl
            }
            topicTags {
                name
                slug
                translatedName
            }
            companyTagStats
            stats
            hints
            solution {
                id
                canSeeDetail
                paidOnly
                hasVideoSolution
                paidOnlyVideo
            }
            status
            sampleTestCase
            metaData
            judgerAvailable
            judgeType
            mysqlSchemas
            enableRunCode
            enableTestMode
            enableDebugger
            libraryUrl
            adminUrl
            challengeQuestion {
                id
                date
                incompleteChallengeCount
                streakCount
                type
            }
            note
        }
    }
}
`;

module.exports = {
  profile,
  recentSubmissions,
  /* submissions, */
  problems,
  daily,
};
