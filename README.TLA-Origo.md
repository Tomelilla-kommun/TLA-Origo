# TLA-Origo
Is a fork from [origo-map/origo](https://github.com/origo-map/origo).

#### Update TLA-Origo with changes from origo-map/origo from time to time:
```bash 
git remote add upstream https://github.com/Tomelilla-kommun/TLA-Origo
git fetch upstream master
git checkout master
git merge upstream/master
git push origin master
git remote add upstream https://github.com/Tomelilla-kommun/TLA-Origo
```
Tomelilla origo configurations are maintained here:

https://github.com/Tomelilla-kommun/TLA-Origo-Configs

### Two diffrent versions are presented in package.json:
* Version
* Tomelilla-version

### Version
Will always follow origo main repository. Changes will be fetched from upstream from time to time.


### Tomelilla-version
Purpose for this addition is to keep track of which manual adjustments that have been made the Tomelilla-fork. These changes may be subject to merge conflicts when Origo-map upstream commits are fetched.

### Changelog Tomelilla

| Tomoelilla-Version | Origo-Version | Author             | Description                      |
|--------------------|---------------|--------------------|----------------------------------|
| 1.0.0              | 2.9.1-dev     | sweco-senari       | Added ability to position sharemap plugin  on screen instead of mapmenu                  |
