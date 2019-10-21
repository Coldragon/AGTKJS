function Init()
{
	engine = CreateEngine(50, 30, "MyGame");
	engine.refresh_rate_ms = 16.6666666667; // 60 fps

	engine.init = function()
	{
		engine.background_color = "#1F1F1F"
		engine.add_entity("Player", 0, 0, '@', "#ff0000");
		engine.add_entity("Ennemy", 10, 5, 'E', "#0000ff");
	};
	
	var x_direction=0, y_direction=0;
	engine.update = function()
	{
		var player = engine.get_entity("Player");
		if(engine.is_pressed("z"))
			player.y += -1;
		if(engine.is_pressed("s"))
			player.y += 1;
		if(engine.is_pressed("d"))
			player.x += 1;
		if(engine.is_pressed("q"))
			player.x += -1;			
		if(engine.is_pressed("ArrowUp") || engine.is_pressed("ArrowDown") || engine.is_pressed("ArrowLeft") || engine.is_pressed("ArrowRight"))
		{
			if(engine.is_pressed("ArrowUp"))
				y_direction = -1;
			else if(engine.is_pressed("ArrowDown"))
				y_direction = 1;
			else
				y_direction = 0;

			if(engine.is_pressed("ArrowLeft"))
				x_direction = -1;
			else if(engine.is_pressed("ArrowRight"))
				x_direction = 1;
			else
				x_direction = 0;

			engine.add_entity("Bombe", player.x, player.y, 'O', "blue", engine.refresh_rate_ms*7, x_direction, y_direction);
		}
		engine.set_entity(player);
	} 

	engine.run();
};

Init();