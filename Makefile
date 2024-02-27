 stg:
	rm -rf build
	npm run build:stage
	firebase use bigc-line-gamification-stg
	firebase deploy --only hosting:bigc-line-gamification-stg
