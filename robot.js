var prompt = require('prompt');

prompt.start();

var cmd = ''

var max_x = 5, max_y = 5;

var get_f = function () {
  if (robot.f == 'NORTH') {
    return {
      'LEFT': 'WEST',
      'RIGHT': 'EAST'
    }
  } else if (robot.f == 'EAST') {
    return {
      'LEFT': 'NORTH',
      'RIGHT': 'SOUTH'
    }

  } else if (robot.f == 'WEST') {
    return {
      'LEFT': 'SOUTH',
      'RIGHT': 'NORTH'
    }

  } else if (robot.f == 'SOUTH') {
    return {
      'LEFT': 'EAST',
      'RIGHT': 'WEST'
    }
  }
}

var robot = {
  x: 0,
  y: 0,
}

var action = function (cmd) {
  if (cmd.startsWith('PLACE ')) {
    var pos = cmd.split(' ')[1].split(',')
    if (pos.length == 3 && (pos[0] >= 0 && pos[0] <= max_x) && (pos[1] >= 0 && pos[1] <= max_y)) {
      robot.x = parseInt(pos[0])
      robot.y = parseInt(pos[1]);
      robot.f = pos[2];
      console.log('Robot initial pos set: ' + robot.x + ',' + robot.y + ',' + robot.f)
    } else {
      console.log('Invalid initial pos')
    }

  }
  else if (cmd == 'MOVE') {
    if (robot.f == null) {
      console.log('Please set initial pos for the robot')
    } else {
      var x_unit = 0, y_unit = 0;
      if (robot.f == 'SOUTH') y_unit = - 1;
      if (robot.f == 'WEST') x_unit = - 1;
      if (robot.f == 'EAST') x_unit = 1;
      if (robot.f == 'NORTH') y_unit = 1;

      var next_x = robot.x + x_unit
      var next_y = robot.y + y_unit

      if ((next_x < 0 || next_x > max_x) || (next_y < 0 || next_y > max_y)) {
        console.log('Invalid cmd: your robot is about to falling to destrction!')
      } else {
        robot.x = next_x;
        robot.y = next_y;
        console.log('Robot moved to pos: ' + robot.x + ',' + robot.y + ',' + robot.f)
      }

    }
  }
  else if (cmd == 'LEFT' || cmd == 'RIGHT') {
    robot.f = get_f()[cmd]
    console.log('Robot turned ' + cmd)
  }
  else if (cmd == 'REPORT') {
    console.log('Robot current pos: ' + robot.x + ',' + robot.y + ',' + robot.f)
  }
  else if (cmd == 'EXIT') {
    console.log('Bye bye')
  }
  else {
    console.log('Unknown Cmd')
  }
}

var processCmd = function () {

  prompt.get(['command'], function (err, result) {
    if (err) { return onErr(err); }

    var cmd = result.command.toUpperCase();

    action(cmd)

    if (cmd != 'EXIT') {
      processCmd();
    }
  });
}

processCmd()

function onErr(err) {
  console.log(err);
  return 1;
}