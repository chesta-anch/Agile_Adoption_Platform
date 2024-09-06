const mongoose = require('mongoose');
const Question = require('../models/Questions');

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://admin:admin@cluster0.eegyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');

    // Array of questions to be added to the database
    const questions = [
      // Section 1: Agile Fundamentals
      {
        sectionId: "section1",
        question: "What is Agile?",
        options: [
          "A project management methodology",
          "A software development methodology",
          "A mindset for iterative development"
        ],
        correctAnswer: "A mindset for iterative development"
      },
      {
        sectionId: "section1",
        question: "Which of the following is a core value of the Agile Manifesto?",
        options: [
          "Comprehensive documentation over working software",
          "Customer collaboration over contract negotiation",
          "Following a plan over responding to change"
        ],
        correctAnswer: "Customer collaboration over contract negotiation"
      },
      {
        sectionId: "section1",
        question: "What does the term 'iterative development' refer to in Agile?",
        options: [
          "Developing a product in one large release",
          "Developing in small, repeatable cycles",
          "Developing features only after requirements are fully defined"
        ],
        correctAnswer: "Developing in small, repeatable cycles"
      },
      {
        sectionId: "section1",
        question: "How does Agile prioritize work?",
        options: [
          "By delivering the most valuable features first",
          "By following a strict project plan",
          "By assigning tasks based on team member availability"
        ],
        correctAnswer: "By delivering the most valuable features first"
      },
      {
        sectionId: "section1",
        question: "What is the main objective of Agile?",
        options: [
          "To deliver a complete product after a long development phase",
          "To deliver small, incremental improvements quickly",
          "To minimize interaction with the customer"
        ],
        correctAnswer: "To deliver small, incremental improvements quickly"
      },
      {
        sectionId: "section1",
        question: "What does 'fail fast' mean in Agile?",
        options: [
          "To complete tasks as quickly as possible",
          "To identify and address issues early in the development process",
          "To avoid making mistakes"
        ],
        correctAnswer: "To identify and address issues early in the development process"
      },
      {
        sectionId: "section1",
        question: "Which of the following is NOT a principle of Agile?",
        options: [
          "Extensive upfront planning",
          "Continuous delivery of valuable software",
          "Welcoming changing requirements"
        ],
        correctAnswer: "Extensive upfront planning"
      },
      {
        sectionId: "section1",
        question: "In Agile, what is the role of the customer?",
        options: [
          "To sign off on the final product",
          "To provide continuous feedback throughout the project",
          "To dictate the project timeline"
        ],
        correctAnswer: "To provide continuous feedback throughout the project"
      },
      {
        sectionId: "section1",
        question: "What is a key benefit of Agile?",
        options: [
          "Reduced collaboration between team members",
          "Increased flexibility and adaptability",
          "Rigid adherence to schedules"
        ],
        correctAnswer: "Increased flexibility and adaptability"
      },
      {
        sectionId: "section1",
        question: "How are teams typically structured in Agile?",
        options: [
          "Cross-functional and self-organizing",
          "Hierarchical with strict management oversight",
          "Specialized and isolated from other teams"
        ],
        correctAnswer: "Cross-functional and self-organizing"
      },

      // Section 2: Scrum Framework
      {
        sectionId: "section2",
        question: "What is the primary role of the Scrum Master?",
        options: [
          "To manage the team and delegate tasks",
          "To facilitate the Scrum process and remove impediments",
          "To define the project’s scope and requirements"
        ],
        correctAnswer: "To facilitate the Scrum process and remove impediments"
      },
      {
        sectionId: "section2",
        question: "What are the time-boxed events in Scrum?",
        options: [
          "Daily Standup, Sprint Planning, Sprint Review, Sprint Retrospective",
          "Weekly Review, Monthly Planning, Daily Standup, Sprint Execution",
          "Project Kickoff, Daily Standup, Sprint Planning, Project Review"
        ],
        correctAnswer: "Daily Standup, Sprint Planning, Sprint Review, Sprint Retrospective"
      },
      {
        sectionId: "section2",
        question: "What is a Sprint Retrospective?",
        options: [
          "A meeting to plan the next sprint",
          "A meeting to review the work completed in the sprint",
          "A meeting to reflect on the sprint and improve processes"
        ],
        correctAnswer: "A meeting to reflect on the sprint and improve processes"
      },
      {
        sectionId: "section2",
        question: "What is a Product Backlog in Scrum?",
        options: [
          "A list of completed tasks",
          "A prioritized list of features, fixes, and requirements for the product",
          "A detailed project plan"
        ],
        correctAnswer: "A prioritized list of features, fixes, and requirements for the product"
      },
      {
        sectionId: "section2",
        question: "Who is responsible for maintaining the Product Backlog?",
        options: [
          "Scrum Master",
          "Product Owner",
          "Development Team"
        ],
        correctAnswer: "Product Owner"
      },
      {
        sectionId: "section2",
        question: "What is the role of the Development Team in Scrum?",
        options: [
          "To deliver potentially shippable product increments at the end of each Sprint",
          "To manage the Product Backlog",
          "To oversee the work of the Scrum Master and Product Owner"
        ],
        correctAnswer: "To deliver potentially shippable product increments at the end of each Sprint"
      },
      {
        sectionId: "section2",
        question: "How long is a typical Sprint in Scrum?",
        options: [
          "1 week",
          "2 to 4 weeks",
          "6 weeks"
        ],
        correctAnswer: "2 to 4 weeks"
      },
      {
        sectionId: "section2",
        question: "What is a Scrum of Scrums?",
        options: [
          "A large Scrum team",
          "A meeting where representatives from multiple Scrum teams discuss progress and challenges",
          "A Sprint planning session"
        ],
        correctAnswer: "A meeting where representatives from multiple Scrum teams discuss progress and challenges"
      },
      {
        sectionId: "section2",
        question: "What does the term 'increment' refer to in Scrum?",
        options: [
          "A sprint cycle",
          "A usable piece of software that adds to the product",
          "A daily meeting"
        ],
        correctAnswer: "A usable piece of software that adds to the product"
      },
      {
        sectionId: "section2",
        question: "What is a Sprint Goal?",
        options: [
          "A specific objective set for a Sprint that can be met through the implementation of Product Backlog items",
          "A report generated after the Sprint",
          "A task assigned to the Scrum Master"
        ],
        correctAnswer: "A specific objective set for a Sprint that can be met through the implementation of Product Backlog items"
      },

      // Section 3: Kanban
      {
                sectionId: "section3",
                question: "What is the primary focus of Kanban?",
                options: [
                    "Delivering work in time-boxed iterations",
                    "Managing work in progress and improving flow",
                    "Enforcing strict deadlines"
                ],
                correctAnswer: "Managing work in progress and improving flow"
      },
      {
                sectionId: "section3",
                question: "What is the purpose of the Kanban board?",
                options: [
                    "To track project costs",
                    "To visualize work and limit work in progress",
                    "To document detailed requirements"
                ],
                correctAnswer: "To visualize work and limit work in progress"
            },
            {
                sectionId: "section3",
                question: "What does the 'WIP limit' refer to in Kanban?",
                options: [
                    "The maximum number of tasks that can be in progress at one time",
                    "The total number of tasks in the backlog",
                    "The deadline for completing a task"
                ],
                correctAnswer: "The maximum number of tasks that can be in progress at one time"
            },
            {
                sectionId: "section3",
                question: "How does Kanban measure the flow of work?",
                options: [
                    "Sprint velocity",
                    "Lead time",
                    "Burndown chart"
                ],
                correctAnswer: "Lead time"
            },
            {
                sectionId: "section3",
                question: "What does the 'Done' column represent on a Kanban board?",
                options: [
                    "Tasks that need to be started",
                    "Tasks that have been completed",
                    "Tasks that are currently in progress"
                ],
                correctAnswer: "Tasks that have been completed"
            },
            {
                sectionId: "section3",
                question: "How does Kanban handle changes in requirements?",
                options: [
                    "Changes are welcomed and can be added to the board at any time",
                    "Changes are discouraged after work has started",
                    "Changes are only allowed at the end of the project"
                ],
                correctAnswer: "Changes are welcomed and can be added to the board at any time"
            },
            {
                sectionId: "section3",
                question: "What is the main goal of using Kanban?",
                options: [
                    "To improve flow and minimize bottlenecks",
                    "To deliver a complete product in one release",
                    "To enforce strict deadlines"
                ],
                correctAnswer: "To improve flow and minimize bottlenecks"
            },
            {
                sectionId: "section3",
                question: "What does the 'To Do' column represent on a Kanban board?",
                options: [
                    "Tasks that are planned but not yet started",
                    "Tasks that are currently in progress",
                    "Tasks that have been completed"
                ],
                correctAnswer: "Tasks that are planned but not yet started"
            },
        

        // Questions for Section 4: Extreme Programming (XP)
        
            {
                sectionId: "section4",
                question: "What is a key practice in Extreme Programming (XP)?",
                options: [
                    "Continuous Integration",
                    "Detailed upfront documentation",
                    "Continuous Integration"
                ],
                correctAnswer: "Continuous Integration"
            },
            {
                sectionId: "section4",
                question: "What does Pair Programming involve?",
                options: [
                    "Two developers working together on the same task",
                    "Two developers working together on the same task",
                    "Two teams working on separate tasks"
                ],
                correctAnswer: "Two developers working together on the same task"
            },
            {
                sectionId: "section4",
                question: "In XP, what is Continuous Integration?",
                options: [
                    "Integrating code changes once every few months",
                    "Integrating code changes into the main branch frequently and automatically",
                    "Integrating different projects into a single release"
                ],
                correctAnswer: "Integrating code changes into the main branch frequently and automatically"
            },
            {
                sectionId: "section4",
                question: "What is Test-Driven Development (TDD) in XP?",
                options: [
                    "Writing code first and testing later",
                    "Writing tests before writing the code",
                    "Testing only the final product"
                ],
                correctAnswer: "Writing tests before writing the code"
            },
            {
                sectionId: "section4",
                question: "Which of the following is a core practice of XP?",
                options: [
                    "Refactoring",
                    "Waterfall planning",
                    "Extensive documentation"
                ],
                correctAnswer: "Refactoring"
            },
            {
                sectionId: "section4",
                question: "What is the role of the Customer in XP?",
                options: [
                    "To review the final product",
                    "To provide continuous feedback and set priorities",
                    "To manage the development team"
                ],
                correctAnswer: "To provide continuous feedback and set priorities"
            },
            {
                sectionId: "section4",
                question: "How does XP handle changes in requirements?",
                options: [
                    "Changes are welcomed and can be made at any time",
                    "Changes are only allowed during designated phases",
                    "Changes are discouraged"
                ],
                correctAnswer: "Changes are welcomed and can be made at any time"
            },
            {
                sectionId: "section4",
                question: "What is the purpose of Refactoring in XP?",
                options: [
                    "To improve the design and structure of existing code without changing its behavior",
                    "To rewrite the entire codebase",
                    "To add new features"
                ],
                correctAnswer: "To improve the design and structure of existing code without changing its behavior"
            },
            {
                sectionId: "section4",
                question: "What does 'YAGNI' stand for in XP?",
                options: [
                    "You Aren't Gonna Need It",
                    "Yes, Agile Grows New Ideas",
                    "You Always Generate New Ideas"
                ],
                correctAnswer: "You Aren't Gonna Need It"
            },
            {
                sectionId: "section4",
                question: "What is the purpose of the 40-hour workweek in XP?",
                options: [
                    "To increase work hours for faster delivery",
                    "To ensure a sustainable pace and prevent burnout",
                    "To reduce team productivity"
                ],
                correctAnswer: "To ensure a sustainable pace and prevent burnout"
            },

      {
                sectionId: "section5",
                question: "What is User Story Mapping?",
                options: [
                    "A technique for creating detailed user specifications",
                    "A method for visualizing the user journey and organizing user stories",
                    "A tool for tracking project milestones"
                ],
                correctAnswer: "A method for visualizing the user journey and organizing user stories"
            },
            {
                sectionId: "section5",
                question: "What is the purpose of a Product Backlog?",
                options: [
                    "To document the project budget and deadlines",
                    "To list and prioritize features, enhancements, and fixes for the product",
                    "To outline the project’s timeline"
                ],
                correctAnswer: "To list and prioritize features, enhancements, and fixes for the product"
            },
            {
                sectionId: "section5",
                question: "What is a common practice for ensuring code quality in Agile?",
                options: [
                    "Code reviews and pair programming",
                    "Extensive upfront documentation",
                    "Using only senior developers"
                ],
                correctAnswer: "Code reviews and pair programming"
            },
            {
                sectionId: "section5",
                question: "What is the purpose of a Sprint Review?",
                options: [
                    "To plan the next Sprint",
                    "To demonstrate and discuss the work completed during the Sprint",
                    "To evaluate the performance of team members"
                ],
                correctAnswer: "To demonstrate and discuss the work completed during the Sprint"
            },
            {
                sectionId: "section5",
                question: "What does 'Kaizen' mean in the context of Agile?",
                options: [
                    "A type of user story",
                    "Continuous improvement",
                    "A planning technique"
                ],
                correctAnswer: "Continuous improvement"
            },
            {
                sectionId: "section5",
                question: "What is the role of the Product Owner in Agile?",
                options: [
                    "To manage the development team",
                    "To prioritize the Product Backlog and ensure the team delivers value",
                    "To handle administrative tasks"
                ],
                correctAnswer: "To prioritize the Product Backlog and ensure the team delivers value"
            },
            {
                sectionId: "section5",
                question: "What is an Agile Spike?",
                options: [
                    "A sudden increase in project scope",
                    "A time-boxed investigation to explore a technical or design problem",
                    "A type of user story"
                ],
                correctAnswer: "A time-boxed investigation to explore a technical or design problem"
            },
            {
                sectionId: "section5",
                question: "What is MoSCoW prioritization?",
                options: [
                    "A technique for assigning tasks to team members",
                    "A method for prioritizing requirements based on Must have, Should have, Could have, and Won't have",
                    "A process for estimating project timelines"
                ],
                correctAnswer: "A method for prioritizing requirements based on Must have, Should have, Could have, and Won't have"
            },
            {
                sectionId: "section5",
                question: "What is the purpose of a Burndown Chart?",
                options: [
                    "To track the project budget",
                    "To visualize the remaining work in a Sprint or project",
                    "To assign tasks to team members"
                ],
                correctAnswer: "To visualize the remaining work in a Sprint or project"
            },
            {
                sectionId: "section5",
                question: "What is a Definition of Done (DoD) in Agile?",
                options: [
                    "A checklist of criteria that a product must meet before release",
                    "A shared understanding of when a user story or task is considered complete",
                    "A final project review"
                ],
                correctAnswer: "A shared understanding of when a user story or task is considered complete"
            },

        // Questions for Section 6: Agile Metrics and Feedback
        
            {
                sectionId: "section6",
                question: "What is a Velocity in Agile?",
                options: [
                    "The speed at which team members complete tasks",
                    "A measure of the amount of work a team completes in a Sprint",
                    "The rate of project completion"
                ],
                correctAnswer: "A measure of the amount of work a team completes in a Sprint"
            },
            {
                sectionId: "section6",
                question: "What is the purpose of a Retrospective?",
                options: [
                    "To review the completed work",
                    "To reflect on the team's processes and improve them",
                    "To estimate the next Sprint’s workload"
                ],
                correctAnswer: "To reflect on the team's processes and improve them"
            },
            {
                sectionId: "section6",
                question: "What does a Burndown Chart measure?",
                options: [
                    "Team member productivity",
                    "The remaining work in a Sprint or project over time",
                    "The budget spent on the project"
                ],
                correctAnswer: "The remaining work in a Sprint or project over time"
            },
            {
                sectionId: "section6",
                question: "What is a common Agile metric used to track progress?",
                options: [
                    "Gantt charts",
                    "Burnup and Burndown charts",
                    "Work Breakdown Structure (WBS)"
                ],
                correctAnswer: "Burnup and Burndown charts"
            },
            {
                sectionId: "section6",
                question: "What does 'Cycle Time' measure in Agile?",
                options: [
                    "The total duration of the project",
                    "The time it takes to complete a task from start to finish",
                    "The length of a Sprint"
                ],
                correctAnswer: "The time it takes to complete a task from start to finish"
            },
            {
                sectionId: "section6",
                question: "What is Lead Time in Agile?",
                options: [
                    "The time between project start and end",
                    "The time from the moment a work item is created until it is completed",
                    "The time taken to review code"
                ],
                correctAnswer: "The time from the moment a work item is created until it is completed"
            },
            {
                sectionId: "section6",
                question: "How is team performance typically measured in Agile?",
                options: [
                    "By tracking the hours worked",
                    "By measuring the delivery of value and meeting customer needs",
                    "By the number of completed tasks"
                ],
                correctAnswer: "By measuring the delivery of value and meeting customer needs"
            },
            {
                sectionId: "section6",
                question: "What is the role of feedback in Agile?",
                options: [
                    "To continuously improve the product and processes",
                    "To identify blame for mistakes",
                    "To finalize the project requirements"
                ],
                correctAnswer: "To continuously improve the product and processes"
            },
            {
                sectionId: "section6",
                question: "What is the purpose of a Burnup Chart?",
                options: [
                    "To track work completed against the total scope",
                    "To measure team productivity",
                    "To assign tasks to team members"
                ],
                correctAnswer: "To track work completed against the total scope"
            },
            {
                sectionId: "section6",
                question: "What is Cumulative Flow Diagram (CFD) used for in Agile?",
                options: [
                    "To visualize work in different states and identify bottlenecks",
                    "To track project costs",
                    "To assign tasks"
                ],
                correctAnswer: "To visualize work in different states and identify bottlenecks"
            },

        // Questions for Section 7: Advanced Topics
        
            {
                sectionId: "section7",
                question: "What is Continuous Deployment?",
                options: [
                    "The practice of automatically deploying code changes to production after passing tests",
                    "Deploying code changes once a month",
                    "Deploying updates manually"
                ],
                correctAnswer: "The practice of automatically deploying code changes to production after passing tests"
            },
            {
                sectionId: "section7",
                question: "What is a key principle of DevOps?",
                options: [
                    "Collaboration between development and operations teams",
                    "Isolating development from operations",
                    "Detailed upfront planning"
                ],
                correctAnswer: "Collaboration between development and operations teams"
            },
            {
                sectionId: "section7",
                question: "What is the role of a Release Train Engineer (RTE) in SAFe (Scaled Agile Framework)?",
                options: [
                    "To develop code",
                    "To facilitate Agile Release Train events and processes",
                    "To manage the development team"
                ],
                correctAnswer: "To facilitate Agile Release Train events and processes"
            },
            {
                sectionId: "section7",
                question: "What is a Portfolio Kanban?",
                options: [
                    "A detailed project plan",
                    "A method for managing and prioritizing work at the portfolio level",
                    "A tool for tracking individual tasks"
                ],
                correctAnswer: "A method for managing and prioritizing work at the portfolio level"
            },
            {
                sectionId: "section7",
                question: "What is the main goal of the Spotify model?",
                options: [
                    "To create a hierarchical structure",
                    "To foster team autonomy and alignment with organizational goals",
                    "To implement a strict project management framework"
                ],
                correctAnswer: "To foster team autonomy and alignment with organizational goals"
            },
            {
                sectionId: "section7",
                question: "What is the key benefit of using Feature Toggles?",
                options: [
                    "To toggle between different software versions",
                    "To release features incrementally and control their visibility",
                    "To manage project budgets"
                ],
                correctAnswer: "To release features incrementally and control their visibility"
            },
            {
                sectionId: "section7",
                question: "What is 'Infrastructure as Code' (IaC)?",
                options: [
                    "The practice of managing and provisioning infrastructure through code",
                    "Creating detailed infrastructure documentation",
                    "Manually setting up servers"
                ],
                correctAnswer: "The practice of managing and provisioning infrastructure through code"
            },
            {
                sectionId: "section7",
                question: "What is the purpose of a Service Mesh?",
                options: [
                    "To manage microservices communication and provide observability",
                    "To deploy code changes",
                    "To manage project timelines"
                ],
                correctAnswer: "To manage microservices communication and provide observability"
            },
            {
                sectionId: "section7",
                question: "What is a common goal of Agile scaling frameworks like SAFe, LeSS, and Disciplined Agile?",
                options: [
                    "To apply Agile principles to large organizations",
                    "To enforce a strict hierarchical structure",
                    "To eliminate the need for team collaboration"
                ],
                correctAnswer: "To apply Agile principles to large organizations"
            },
            {
                sectionId: "section7",
                question: "What does 'Shift Left' mean in DevOps?",
                options: [
                    "To address testing and quality issues earlier in the development process",
                    "To delay code reviews until the end of the project",
                    "To focus on infrastructure development"
                ],
                correctAnswer: "To address testing and quality issues earlier in the development process"
            }
    
    ];
    console.log(Question);

    // Insert questions into the database
    return Question.insertMany(questions);
  })
  .then((docs) => {
    console.log('Questions inserted successfully:', docs);
  })
  .catch((err) => {
    console.error('Error inserting questions:', err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
