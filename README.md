# Fix the Quality Gate

(difficulty: 🔥🔥)

The order service is clean and SonarQube Cloud is already set up. Now a new feature arrives as a pull request: loyalty points. The pull request will not pass the quality gate. Your job is to find out why, and to fix it.

## Put the project on GitHub

The folder you downloaded has to be the **root** of your repository (the `.github` folder has to be at the top level, `ls -a` shows it).

1. Run `git init -b main` in the project folder.
2. Create a new **public** repository on GitHub. Do not add a README, `.gitignore` or license.
3. Connect and push:
   ```sh
   git add .
   git commit -m "Initial commit"
   git remote add origin <url-of-your-repository>
   git push -u origin main
   ```

## Connect the repository to SonarQube Cloud

SonarQube Cloud (formerly SonarCloud) is free for public repositories.

1. Open [sonarcloud.io](https://sonarcloud.io) and log in with your GitHub account.
2. Create an organization for your GitHub account (the free plan is enough) and import your repository.
3. When SonarQube Cloud asks for the **analysis method**, choose **With GitHub Actions** (CI-based analysis). If automatic analysis is switched on for the project, switch it off under `Administration` → `Analysis Method`. Automatic analysis cannot import test coverage.
4. Create a token in SonarQube Cloud (`My Account` → `Security`) and save it in your GitHub repository as a secret named `SONAR_TOKEN` (`Settings` → `Secrets and variables` → `Actions`).
5. Put the **organization key** and the **project key** of your project into `sonar-project.properties`.

## Tasks

1. Push the project to `main` and wait for the first analysis. The quality gate is green.
2. Create a branch `feature/loyalty-points`. Copy `pr-changes/src/loyalty.ts` to `src/loyalty.ts`, commit and push. Open a pull request into `main`.
3. Wait for the checks. Look at the result of SonarQube Cloud on the pull request and open the analysis. Which conditions of the quality gate fail? Write down every issue it reports and what it means.
4. Fix the new code. Rules for the feature:
   - A customer gets 1 point per full euro (regular), 2 points (member) or 3 points (vip).
   - The code that generates a redeem code must not use `Math.random`.
   - No credentials in the source code. Read them from the environment.
5. Write tests for the new code until its coverage on new code is at least 80 %. Look at the coverage of `src/loyalty.ts` in SonarQube Cloud, not only at the terminal.
6. Push to the branch. The pull request analysis runs again. Repeat until the quality gate is green.
7. Run `npm run lint`. Which of the findings did SonarQube Cloud report as well?
8. **Bonus:** Mark one finding as "Accepted" or "False positive" in SonarQube Cloud. When is that a good idea, and when is it not?

> 💡 The quality gate only looks at the **new code** of the pull request. The old code is not your problem. This is what Sonar calls "Clean as You Code".

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run coverage` runs the tests and writes a coverage report to `coverage` (`coverage/lcov.info` is the file SonarQube Cloud reads)
- `npm run check` checks the types
- `npm run lint` runs ESLint, including rules from `eslint-plugin-sonarjs` that are similar to SonarQube rules
- `npm run format` formats the code with Prettier, `npm run format:check` only checks it
