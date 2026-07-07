---
name: daily-summary
description: Generate a daily progress summary from git commits and Jira tickets
allowed-tools: [Bash, Read, WebFetch]
---

## Instructions
1. Read the last 24h of git commits using `git log --since="24 hours ago" --pretty=format:"%h %s (%an)"`.
2. Fetch open Jira tickets assigned to the current user (use the `jira-personal` MCP `jira_search` tool with a JQL like `assignee = currentUser() AND statusCategory != Done`).
3. Summarize into three sections:
   - **Shipped** — what landed (from commits)
   - **In progress** — tickets currently being worked
   - **Blocked** — anything flagged blocked or stalled
4. Format the output as a Slack-ready message: short bullet points, no tables, lead with a one-line headline.
