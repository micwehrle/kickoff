# How to query the guide

My dev environment is all mac os.
I built a little boilerplate inspired by https://blog.engineyard.com/2015/integrating-react-with-backbone

## Installation Steps
- install node 4.0.0 (I use nvm) - it *might* be ok with a prior version. That's what I worked with atm.
- `git clone https://github.com/micwehrle/kickoff.git`
- `cd kickoff`
- `git checkout fun-with-autocomplete`
- `npm install`
- `npm install -g gulp`
- `gulp &`
- `npm start &`
- `open localhost:1995`

## Notes
Not everything does as I'd expect it to. If the weather hadn't been so nice ....
Use `return` instead of `tab` and refocus on the input .... :-/




# kickoff
Boilerplate 2015-09


Todo:  
- configure eslint


For me, I don't want to keep up with _all_ the new and crazy frameworks all the time.
I like something I can come back to, a toolchain that does not change all that often and
that I can rely on and that provides me with what I usually need in a project.


Project layout

```
kickoff
|- build
|- client
  |- less
|- public
  |- js
  |- style
|- server
|- test
  |- client
