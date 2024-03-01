 stg:
	rm -rf build
	npm run build:stage
	firebase use bigc-line-gamification-stg
	firebase deploy --only hosting:bigc-line-gamification-stg

prod:
	rm -rf build
	npm run build:prod
	firebase use bigc-line-gamification-prod
	firebase deploy --only hosting:bigc-line-gamification-prod
