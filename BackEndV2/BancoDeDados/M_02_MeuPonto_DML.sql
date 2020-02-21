USE M_MeuPonto

INSERT INTO Usuarios(Ni,Nome,Email,Senha,CPF,Tipo)
	VALUES
			('98123461' ,'Administrador' , 'MeuPonto@email.com' , '12345678','478.968.143-17','ADMINISTRADOR')
		 
INSERT INTO Pontos(IdUsuario, DataHorario, Tipo)
	VALUES
			(1, '2020-02-12 08:00:00', 'Entrada')

alter table Usuarios add Ativo varchar(200);

update Pontos set Imagem = 'https://www.topdata.com.br/media/comprovante-de-ponto-do-trabalhador.jpg' where IdPonto = 1

update Usuarios set Ativo = 1 where IdUsuario = 10
update Usuarios set Ativo = 1 where IdUsuario = 1
update Usuarios set Ativo = 0 where IdUsuario = 3