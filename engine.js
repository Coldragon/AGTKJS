function CreateEngine(width, height, name)
{
	document.getElementById('title').innerHTML = '<h2>' + name + '</h2>'

	function init_back_buffer_char()
	{
		backbuffer = new Array();
		for(i = 0; i < width*height; i++)
			backbuffer[i] = "X";
		return backbuffer;
	}

	function init_back_buffer_color()
	{
		backbuffer = new Array();
		for(i = 0; i < width*height; i++)
			backbuffer[i] = "#000000";
		return backbuffer;
	}

	return {
		// --------------------------------------------------------------------- //
		// PRIVATE
		// --------------------------------------------------------------------- //
		__input_up: function(e) { 
			this.input_key[e.key] = false; 
		},
		__input_down: function(e) {
			this.input_key[e.key] = true; 
		},
		__flip_buffer: function()
		{
			let affichage = document.getElementById('frontbuffer');
			affichage.innerHTML = ""
			for(i = 0; i < this.height; i++)
			{
				for(j = 0; j < this.width; j++)
				{
					if(this.backbuffer_color[j+width*i] != this.background_color && this.backbuffer_char[j+width*i] != " ")
						affichage.innerHTML += '<span style="color:' + this.backbuffer_color[j+width*i] + '">'+ this.backbuffer_char[j+width*i] + '</span>';
					else
						affichage.innerHTML += " "
				}
				affichage.innerHTML += "<br />"
			}
		},
		__clean_buffer: function()
		{
			document.getElementById('frontbuffer').style.background=this.background_color;
			for(i = 0; i < width*height; i++)
				this.backbuffer_color[i] = this.background_color;
			for(i = 0; i < width*height; i++)
				this.backbuffer_char[i] = " ";
		},
		__update_loop: function()
		{
			this.__clean_buffer();
			this.__process_entities();
			this.update();
			this.__flip_buffer();
			if(this.is_running)
				setTimeout(this.__update_loop.bind(this), this.refresh_rate_ms);
		},
		__build_entity: function(name, x, y, char, color, lifespan, x_move, y_move)
		{
			if(x_move == null)
				x_move = 0;
			if(y_move == null)
				y_move = 0;
	
			return {
				name: name,
				x: x,
				y: y,
				move_x: x_move,
				move_y: y_move,
				lifespan: lifespan, // ms
				char: char,
				color: color
			};
		},
		__process_entities: function()
		{
			for(var entity in this.entities) 
			{
				if(this.entities[entity].lifespan <= 0 && this.entities[entity].lifespan != null)
				{
					delete this.entities[entity]
				}
				else
				{
					this.entities[entity].lifespan -= this.refresh_rate_ms;
					this.entities[entity].x += this.entities[entity].move_x;
					this.entities[entity].y += this.entities[entity].move_y;
					this.set_pixel(this.entities[entity].x, this.entities[entity].y, this.entities[entity].char, this.entities[entity].color);	
				}
			}
		},
		// --------------------------------------------------------------------- //
		// PUBLIC
		// --------------------------------------------------------------------- //
		input_key: {},
		input_key_onPress: {},
		input_key_onRelease: {},
		entities: {},
		name: name,
		width: width,
		height: height,
		refresh_rate_ms: 1000,
		backbuffer_char: init_back_buffer_char(),
		backbuffer_color: init_back_buffer_color(),
		background_color: "#000000",
		is_running: true,
		init: function(){},
		update: function(){},
		destroy: function(){},
		run: function(){
			window.onkeyup = this.__input_up.bind(this);
			window.onkeydown = this.__input_down.bind(this);
			this.init();
			this.__update_loop();
			this.destroy();
		},
		set_pixel: function(x, y, char, color)
		{
			this.backbuffer_char[x+(y*this.width)] = char;
			this.backbuffer_color[x+(y*this.width)] = color;
		},
		get_pixel: function(x, y)
		{

		},
		is_pressed: function(key)
		{
			if(this.input_key[key] == true)
				return true;
			else
				return false;
		},
		add_entity: function(name, x, y, char, color, lifespan, x_move, y_move)
		{
			while(this.entities[name]!=null)
			{
				name+="_";
			}
			this.entities[name] = this.__build_entity(name, x, y, char, color, lifespan, x_move, y_move);
			return name;
		},
		set_entity: function(entity_object)
		{
			this.entities[entity_object.name] = entity_object;
		},
		get_entity: function(entity)
		{
			return this.entities[entity];
		}
	}
}