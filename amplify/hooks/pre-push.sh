#!/bin/bash
# This bash script runs before amplify push command, which takes all the resolvers we wrote, and overwrite the 
# auto-generated resolvers.
sourceDir="./amplify/backend/api/weplaymain/build/resolvers"
destinationDir="./amplify/backend/api/weplaymain/resolvers"
customResolverDir="./amplify/backend/api/weplaymain/customResolvers"
# Regex pattern to match files
pattern="\.auth\."
deleteOpRe="delete";
createOpRe="create";
updateOpRe="update";
getOpRe="get";
listOpRe="list";
syncOpRe="sync";
responsRe="\.res\.";
requestRe="\.req\.";

customLambdaRe="insertPlayer|insertTeam|updatePlayer|updateTeam|createUser|deleteUser|listUsers|createTourney|updateTourney";

## This is where we insert actions that may have global records across all businesses.
## for example Roles, TournamentRules as well.
globalRecordsRe="listTournamentRules|TournamentRules.TRulesToTFormat.auth.1.req"

lambdaCustomResolver='./amplify/backend/api/weplaymain/customResolvers/Lambda.Mutation.req.vtl';
subModelReqResolver="./amplify/backend/api/weplaymain/customResolvers/Model.subModel.customAuth.req.vtl"
createReqResolver="./amplify/backend/api/weplaymain/customResolvers/Mutation.create.customAuth.req.vtl"
deleteReqResolver="./amplify/backend/api/weplaymain/customResolvers/Mutation.delete.customAuth.req.vtl"
deleteResResolver="./amplify/backend/api/weplaymain/customResolvers/Mutation.delete.customAuth.res.vtl"
updateReqResolver="./amplify/backend/api/weplaymain/customResolvers/Mutation.update.customAuth.req.vtl"
updateResResolver="./amplify/backend/api/weplaymain/customResolvers/Mutation.update.customAuth.res.vtl"
getReqResolver="./amplify/backend/api/weplaymain/customResolvers/Query.get.customAuth.req.vtl"
listReqResolver="./amplify/backend/api/weplaymain/customResolvers/Query.list.customAuth.req.vtl"
globalListResolver="./amplify/backend/api/weplaymain/customResolvers/Query.ListGlobal.customAuth.1.req.vtl"

declare -A businessCustomResolvers
businessCustomResolvers["businessQueryGetReq"]="./amplify/backend/api/weplaymain/customResolvers/Query.getBusinesses.auth.1.req.vtl"
businessCustomResolvers["businessQueryListReq"]="./amplify/backend/api/weplaymain/customResolvers/Query.listBusinesses.auth.1.req.vtl"
businessCustomResolvers["businessQueryCreateReq"]="./amplify/backend/api/weplaymain/customResolvers/Mutation.createBusinesses.auth.1.req.vtl"
businessCustomResolvers["businessMutationUpdateReq"]="./amplify/backend/api/weplaymain/customResolvers/Mutation.updateBusinesses.auth.1.req.vtl"
businessCustomResolvers["businessMutationUpdateRes"]="./amplify/backend/api/weplaymain/customResolvers/Mutation.updateBusinesses.auth.1.res.vtl"
businessCustomResolvers["businessMutationDeleteReq"]="./amplify/backend/api/weplaymain/customResolvers/Mutation.deleteBusinesses.auth.1.req.vtl"
businessCustomResolvers["businessMutationDeleteRes"]="./amplify/backend/api/weplaymain/customResolvers/Mutation.deleteBusinesses.auth.1.req.vtl"

declare -A policyIAMResolvers
policyIAMResolvers["listContactRoles"]="./amplify/backend/api/weplaymain/customResolvers/Query.listContactRoles.auth.1.req.vtl"
policyIAMResolvers["listActions"]="./amplify/backend/api/weplaymain/customResolvers/Policy.Action.auth.1.req.vtl"
policyIAMResolvers["listPolicies"]="./amplify/backend/api/weplaymain/customResolvers/Query.listPolicies.auth.1.req.vtl"
# Count the number of files that match the pattern
./amplify api gql-compile

if [ ! -d "$destinationDir" ]; then
  mkdir -p "$destinationDir"
  echo "Directory $destinationDir created."
else
  echo "Directory $destinationDir already exists."
fi


if [ -d "$destinationDir" ]; then
    # Delete all files in the directory
    rm -f "$destinationDir"/*
    echo "All files in $destinationDir have been deleted."
else
    echo "Directory $destinationDir does not exist."
fi

./amplify api gql-compile

for file in "$sourceDir"/*; do
    if [[ -f "$file" && "$file" =~ $pattern ]]; then
        cp "$file" "$destinationDir"
    fi
done

for resolver in "$destinationDir"/*; do
  if [[ $(basename "$resolver") =~ $globalRecordsRe ]]; then
      # If the file name matches the pattern, paste the content into the file
      cp "$globalListResolver" "$resolver"
      echo "Content pasted into file: $resolver"
  elif [[ $(basename "$resolver") =~ $customLambdaRe ]]; then
      # If the file name matches the pattern, paste the content into the file
      cp "$lambdaCustomResolver" "$resolver" 
      echo "Content pasted into file: $resolver"
  elif [[ $(basename "$resolver") =~ $createOpRe ]]; then
      # If the file name matches the pattern, paste the content into the file
      cp "$createReqResolver" "$resolver"
      echo "Content pasted into file: $resolver"
  elif [[ $(basename "$resolver") =~ $getOpRe ]]; then
      # If the file name matches the pattern, paste the content into the file
      cp "$getReqResolver" "$resolver" 
      echo "Content pasted into file: $resolver"
  elif [[ $(basename "$resolver") =~ $listOpRe ]]; then
      # If the file name matches the pattern, paste the content into the file
      cp "$listReqResolver" "$resolver" 
      echo "Content pasted into file: $resolver"
  elif [[ $(basename "$resolver") =~ $deleteOpRe ]]; then
      # If the file name matches the pattern, paste the content into the file
      if [[ $(basename "$resolver") =~ $requestRe ]]; then
        cp "$deleteReqResolver" "$resolver"
        echo "Content pasted into file: $resolver"
      else
        cp "$deleteResResolver" "$resolver"
        echo "Content pasted into file: $resolver"
      fi
  elif [[ $(basename "$resolver") =~ $updateOpRe ]]; then
      # If the file name matches the pattern, paste the content into the file
      if [[ $(basename "$resolver") =~ $requestRe ]]; then
        cp "$updateReqResolver" "$resolver"
        echo "Content pasted into file: $resolver"
      else
        cp "$updateResResolver" "$resolver"
        echo "Content pasted into file: $resolver"
      fi
  else 
      cp "$subModelReqResolver" "$resolver"
      echo "Content pasted into file: $resolver"
  fi
done

for customResolver in ${!businessCustomResolvers[@]}; do
    cp "${businessCustomResolvers[${customResolver}]}" "$destinationDir"
done

for customResolver in ${!policyIAMResolvers[@]}; do
    cp "${policyIAMResolvers[${customResolver}]}" "$destinationDir"
done