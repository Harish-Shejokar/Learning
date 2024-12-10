
# !/bin/bash  - (The #!/bin/bash line tells the system that this script should be executed with Bash)

# chmod +x start.sh  (After saving the scirpt we have to make it executable by this command).


# STEPS FOR RUNNING THE SH_FILE :
# first check which branch it is , if is is main the simple take git pull
# ohterwise change to main branch and then take pull
#

GIT_BRANCH_NAME=$(git branch --show-current)

if [ "$GIT_BRANCH_NAME" != "main" ]
then
echo "switching to branch - main"
git checkout main
echo "Successfully switch to main"
echo "taking pull form main branch"
git pull
else
echo "Taking pull for branch - $GIT_BRANCH_NAME"
git pull
fi

# echo $GIT_BRANCH_NAME

npm install

npm start