Yukti

📄 Product Requirement Document (PRD)
Project Name
CodeBattle Arena (CBA)
Version
1.0 (Draft)
Status
In-Planning
Document Type
Technical Specification & Feature Requirement
Objective
To gamify Data Structures & Algorithms (DSA) preparation through real-time multiplayer battles and collaborative learning tools.


1. Executive Summary
CodeBattle Arena is a real-time, multiplayer competitive coding platform designed to bridge the gap between "solitary coding practice" and "high-pressure technical interviews."
Unlike existing platforms (LeetCode, HackerRank) that focus on individual problem solving, CBA introduces a Gamified Battle Royale mechanic where users compete 1v1 or in teams (Squads) to solve random DSA problems. The platform uniquely integrates collaborative tools (Whiteboard, Video/Audio) directly into the battle environment to facilitate post-match analysis and peer-to-peer learning.

2. Target Audience
Computer Science Students: Preparing for campus placements and seeking a fun way to practice.
Job Seekers: Professionals looking to brush up on DSA under simulated time pressure.
Coding Bootcamps/Clubs: Organizations running internal hackathons or practice sessions.

3. Core Features & Functional Requirements
3.1. The Battle System (Gameplay)
Matchmaking Modes:
1v1 Duel: Automated matchmaking based on Elo Rating (Beginner vs Beginner, Pro vs Pro).
Squad Wars: Users can form a lobby of up to 5 friends and compete against another team or against each other.
Battle Royale: 10+ users enter; the first to solve the problem wins.
Problem Assignment:
System fetches a random DSA problem from the database based on the selected difficulty (Easy, Medium, Hard).
Both/All sides receive the exact same problem at the exact same time.
Real-Time Scoring Logic:
Correctness (60%): Number of test cases passed.
Time Efficiency (20%): How fast the solution was submitted relative to the time limit.
Code Optimization (20%): Memory usage and Execution time (judged by the compiler).
3.2. Integrated Development Environment (The Arena)
Code Editor: Monaco Editor integration (VS Code like experience) with syntax highlighting and intelligent code completion.
Language Support: C++, Java, Python, JavaScript.
Blind Mode (Optional): Users can see an opponent's progress bar (percentage of test cases passed) but not their code, creating competitive pressure.
3.3. Collaborative Suite (The USP)
Interactive Whiteboard:
A "Scribble-like" canvas available post-match (or during team rounds).
Feature: Users can drag-and-drop code snippets onto the canvas to draw logic flows (e.g., drawing pointers for a Linked List).
Integrated Communication:
Video/Audio: Embedded WebRTC video bubbles for players in the room. No external Zoom/Discord required.
Live Chat: Text-based chat with markdown support for code sharing.
3.4. Engagement & "Viral" Features
College Wars:
Leaderboards aggregating scores by University/College domains (e.g., IIT Delhi vs. NIT Trichy).
Requires email domain verification (.edu or .ac.in).
The "Replay" System:
Records every keystroke of the coding session.
Users can watch a "Time-Travel" replay of the winner’s code to understand their thought process (e.g., "Did they write the helper function first?").
AI Referee & Analysis:
Post-game breakdown using LLMs (Large Language Models).
Example Output: "Player A won because they used a HashMap (O(1)), while Player B used a nested loop (O(n^2))."

4. Technical Architecture
4.1. Tech Stack
Component
Technology
Justification
Frontend
Next.js (React) + Tailwind CSS
Server-Side Rendering (SSR) for speed; high performance UI.
State Management
Zustand
Managing complex game states (scores, timer, player status).
Backend API
Node.js + Express (TypeScript)
Event-driven architecture suitable for real-time apps.
Real-Time Engine
Socket.io
Low-latency bi-directional communication for game synchronization.
Video/Audio
LiveKit or PeerJS (WebRTC)
Scalable, open-source video infrastructure.
Code Execution
Judge0 (Dockerized)
Secure, sandboxed remote code execution API.
Database
MongoDB (Data) + Redis (Cache)
MongoDB for flexible user data; Redis for live leaderboards and fast session storage.

4.2. Security Constraints
Sandboxing: All user-submitted code must run in isolated Docker containers (via Judge0) to prevent server-side attacks (e.g., infinite loops, file system access).
Rate Limiting: Prevent abuse of the compiler API.
Anti-Cheat: Detect copy-pasting from external sources (basic focus/blur detection).

5. UI/UX Workflow
Onboarding: User Login (GitHub/Google) -> Profile Setup (College Name, Avatar).
Lobby: Select Mode (1v1 / Squad) -> Invite Friends (Copy Link) -> Start Search.
The Battle:
Split Screen: Problem on Left, Editor on Center, Opponent Status on Right.
Top Bar: Timer & Live Score.
Post-Match (The Cool Down):
Winner Announcement.
"Discuss" Button: Opens the Shared Whiteboard and maximizes Video Call.
"Replay" Button: Watch the code construction.

6. Development Roadmap (Phased Approach)
Phase 1: MVP (Minimum Viable Product)
User Authentication.
1v1 Matchmaking (Random).
Basic Code Editor + Compiler (Judge0).
Simple Winner declaration based on Test Cases.
Phase 2: Collaboration & Real-Time
Integration of Socket.io for live opponent progress bars.
Addition of Video/Audio calling (WebRTC).
Implementation of the Whiteboard canvas.
Phase 3: Gamification & Social
College Wars Leaderboard.
Replay System (recording keystrokes).
Elo Rating System implementation.

7. Success Metrics (KPIs)
DAU (Daily Active Users): Number of unique players battling.
Retention Rate: Percentage of users returning after their first battle.
Average Session Time: High session time indicates successful engagement via the "Discuss/Whiteboard" feature.



